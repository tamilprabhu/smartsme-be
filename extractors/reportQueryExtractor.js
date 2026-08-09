const { z } = require('zod');
const LLMFactory = require('../factories/llmFactory');
const logger = require('../config/logger');

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

/**
 * ReportQuerySchema – validated structured output for production report queries.
 *
 * Using z.enum() throughout (not z.literal / z.const) because enum maps
 * cleanly to JSON Schema "enum" arrays which all LLM providers understand.
 *
 * superRefine enforces cross-field logic that Zod runs after the LLM responds,
 * catching cases where the model returns CUSTOM_RANGE but omits the dates.
 */
const ReportQuerySchema = z
    .object({
        isValidReportQuery: z
            .enum(['YES', 'NO'])
            .describe(
                "Set to 'YES' if the prompt is asking for a production shift report or date filter. " +
                    "Set to 'NO' if it is unrelated or contains no report query.",
            ),

        rejectionReason: z
            .string()
            .nullable()
            .describe("If isValidReportQuery is 'NO', explain why. Otherwise null."),

        productName: z
            .string()
            .nullable()
            .describe(
                'Product name mentioned in the query, or null if no specific product was mentioned.',
            ),

        timeframeType: z
            .enum(['PRESET', 'CUSTOM_RANGE', 'NONE'])
            .describe(
                "PRESET for relative terms like 'today' or 'last week'. " +
                    'CUSTOM_RANGE for explicit start/end dates. ' +
                    'NONE if the query is invalid.',
            ),

        preset: z
            .enum([
                'TODAY',
                'YESTERDAY',
                'THIS_WEEK',
                'LAST_WEEK',
                'THIS_MONTH',
                'LAST_MONTH',
                'THIS_QUARTER',
                'LAST_QUARTER',
                'THIS_YEAR',
                'LAST_YEAR',
                'NONE',
            ])
            .describe('Relative preset name if timeframeType is PRESET, otherwise NONE.'),

        startDate: z
            .string()
            .nullable()
            .describe(
                'Calculated ISO start date (YYYY-MM-DD), or null for presets / invalid queries.',
            ),

        endDate: z
            .string()
            .nullable()
            .describe(
                'Calculated ISO end date (YYYY-MM-DD), or null for presets / invalid queries.',
            ),

        explanation: z
            .string()
            .describe('Brief explanation of how the dates or preset were interpreted.'),
    })
    .superRefine((data, ctx) => {
        if (data.isValidReportQuery === 'YES' && data.timeframeType === 'CUSTOM_RANGE') {
            if (!data.startDate) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'CUSTOM_RANGE requires a non-null startDate.',
                    path: ['startDate'],
                });
            }
            if (!data.endDate) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'CUSTOM_RANGE requires a non-null endDate.',
                    path: ['endDate'],
                });
            }
        }
    });

// ---------------------------------------------------------------------------
// Preset resolver – converts preset enum → concrete YYYY-MM-DD dates
// Done in code, not by the LLM, so dates are always deterministic.
// ---------------------------------------------------------------------------

/**
 * Resolve a PRESET value to concrete startDate / endDate strings.
 * @param {string} preset  - One of the PRESET enum values
 * @param {Date}   now     - Reference date (defaults to current date)
 * @returns {{ startDate: string, endDate: string }}
 */
function resolvePreset(preset, now = new Date()) {
    const fmt = (d) => d.toISOString().split('T')[0];

    // Helper: start of day for a given date
    const startOf = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

    const today = startOf(now);
    const todayStr = fmt(today);

    switch (preset) {
        case 'TODAY':
            return { startDate: todayStr, endDate: todayStr };

        case 'YESTERDAY': {
            const y = new Date(today);
            y.setDate(y.getDate() - 1);
            const ys = fmt(y);
            return { startDate: ys, endDate: ys };
        }

        case 'THIS_WEEK': {
            // Week starts on Monday
            const dow = today.getDay(); // 0=Sun
            const diff = dow === 0 ? -6 : 1 - dow;
            const mon = new Date(today);
            mon.setDate(today.getDate() + diff);
            return { startDate: fmt(mon), endDate: todayStr };
        }

        case 'LAST_WEEK': {
            const dow = today.getDay();
            const diff = dow === 0 ? -6 : 1 - dow;
            const thisMonday = new Date(today);
            thisMonday.setDate(today.getDate() + diff);
            const lastMon = new Date(thisMonday);
            lastMon.setDate(thisMonday.getDate() - 7);
            const lastSun = new Date(thisMonday);
            lastSun.setDate(thisMonday.getDate() - 1);
            return { startDate: fmt(lastMon), endDate: fmt(lastSun) };
        }

        case 'THIS_MONTH': {
            const first = new Date(today.getFullYear(), today.getMonth(), 1);
            return { startDate: fmt(first), endDate: todayStr };
        }

        case 'LAST_MONTH': {
            const firstOfThis = new Date(today.getFullYear(), today.getMonth(), 1);
            const lastOfPrev = new Date(firstOfThis);
            lastOfPrev.setDate(0);
            const firstOfPrev = new Date(lastOfPrev.getFullYear(), lastOfPrev.getMonth(), 1);
            return { startDate: fmt(firstOfPrev), endDate: fmt(lastOfPrev) };
        }

        case 'THIS_QUARTER': {
            const q = Math.floor(today.getMonth() / 3);
            const firstMonth = q * 3;
            const first = new Date(today.getFullYear(), firstMonth, 1);
            return { startDate: fmt(first), endDate: todayStr };
        }

        case 'LAST_QUARTER': {
            const q = Math.floor(today.getMonth() / 3);
            const prevQ = q === 0 ? 3 : q - 1;
            const year = q === 0 ? today.getFullYear() - 1 : today.getFullYear();
            const firstMonth = prevQ * 3;
            const first = new Date(year, firstMonth, 1);
            const last = new Date(year, firstMonth + 3, 0);
            return { startDate: fmt(first), endDate: fmt(last) };
        }

        case 'THIS_YEAR': {
            const first = new Date(today.getFullYear(), 0, 1);
            return { startDate: fmt(first), endDate: todayStr };
        }

        case 'LAST_YEAR': {
            const y = today.getFullYear() - 1;
            return { startDate: `${y}-01-01`, endDate: `${y}-12-31` };
        }

        default:
            // Fallback: last 7 days
            logger.warn(
                `[ReportQueryExtractor] Unknown preset: ${preset}, defaulting to last 7 days`,
            );
            const sevenAgo = new Date(today);
            sevenAgo.setDate(today.getDate() - 7);
            return { startDate: fmt(sevenAgo), endDate: todayStr };
    }
}

// ---------------------------------------------------------------------------
// Main extractor
// ---------------------------------------------------------------------------

/**
 * Extract and validate a structured report query from a free-text user message.
 *
 * Returns an object with:
 *   - isValidReportQuery: 'YES' | 'NO'
 *   - rejectionReason: string | null
 *   - productName: string | null
 *   - startDate: string (YYYY-MM-DD) – always resolved, never null on success
 *   - endDate:   string (YYYY-MM-DD) – always resolved, never null on success
 *   - explanation: string
 *
 * Throws if the LLM call or Zod validation fails (caller handles gracefully).
 *
 * @param {string} userMessage
 * @param {Date}   [referenceDate]  - Override today's date (useful in tests)
 * @returns {Promise<object>}
 */
async function extractReportQuery(userMessage, referenceDate = new Date()) {
    const todayIso = referenceDate.toISOString().split('T')[0];
    const dayOfWeek = referenceDate.toLocaleDateString('en-US', { weekday: 'long' });

    logger.info(`[ReportQueryExtractor] Extracting from: "${userMessage.substring(0, 80)}"`);

    const llm = LLMFactory.getLLM();
    const structuredLLM = llm.withStructuredOutput(ReportQuerySchema);

    const result = await structuredLLM.invoke([
        {
            role: 'system',
            content: `You are a production report query extractor for a manufacturing system.
Today's date: ${todayIso} (${dayOfWeek})

RULES:
1. If the message asks for production data, shifts, reports, or analytics:
   - Set isValidReportQuery: "YES"
   - Set rejectionReason: null
   - Extract productName if a specific product is mentioned, otherwise null
   - For relative timeframes (today, last week, this month), set timeframeType: "PRESET" and choose the correct preset
   - For explicit date ranges (e.g. "from July 1 to July 31"), set timeframeType: "CUSTOM_RANGE" and calculate startDate / endDate as YYYY-MM-DD
   - If no date is mentioned at all, set timeframeType: "PRESET" and preset: "THIS_WEEK" as a sensible default

2. If the message is unrelated (greetings, poems, general questions):
   - Set isValidReportQuery: "NO"
   - Set rejectionReason with a brief explanation
   - Set timeframeType: "NONE", preset: "NONE", startDate: null, endDate: null`,
        },
        {
            role: 'user',
            content: `Extract report query from: "${userMessage}"`,
        },
    ]);

    logger.info(
        `[ReportQueryExtractor] Result – valid: ${result.isValidReportQuery}, ` +
            `type: ${result.timeframeType}, preset: ${result.preset}, ` +
            `product: ${result.productName}, start: ${result.startDate}, end: ${result.endDate}`,
    );

    // For PRESET types, resolve to concrete dates server-side (deterministic)
    if (result.isValidReportQuery === 'YES' && result.timeframeType === 'PRESET') {
        const resolved = resolvePreset(result.preset, referenceDate);
        result.startDate = resolved.startDate;
        result.endDate = resolved.endDate;
        logger.info(
            `[ReportQueryExtractor] Preset "${result.preset}" resolved → ` +
                `${result.startDate} to ${result.endDate}`,
        );
    }

    return result;
}

module.exports = { extractReportQuery, ReportQuerySchema, resolvePreset };
