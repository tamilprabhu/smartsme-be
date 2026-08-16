'use strict';

const {
    DuplicateOperatorError,
    NegativeCountError,
    ProductionMismatchError,
    RejectionExceedsProductionError,
    NetProductionMismatchError,
    MissingIncentiveReasonError,
} = require('./ProductionShiftErrors');

/**
 * ProductionShiftEntity
 *
 * The domain object for a production shift (DDD Aggregate Root).
 * This class owns all business invariants related to a shift.
 *
 * It has NO knowledge of:
 *   - Express (no req / res)
 *   - Sequelize (no Model.findOne / .save)
 *   - Joi (no schema.validate)
 *
 * Referential checks (does product/machine/order actually exist in the DB?)
 * are the Application layer's responsibility — they belong in use-cases.
 */
class ProductionShiftEntity {
    /**
     * @param {object} props
     * @param {number}       [props.shiftSequence]  - PK (null when not yet persisted)
     * @param {string}       [props.shiftId]        - generated unique string ID
     * @param {string}        props.companyId
     * @param {string}        props.productId
     * @param {string}        props.machineId
     * @param {string|null}  [props.orderId]
     * @param {Date}          props.shiftStartDate
     * @param {Date}          props.shiftEndDate
     * @param {string}        props.entryType        - '1' (SHIFT) | '2' (HOURS)
     * @param {string|null}  [props.shiftType]       - '1' | '2' | '3'
     * @param {string|null}  [props.shiftHours]      - '6' | '8' | '12'
     * @param {number}        props.operator1
     * @param {number|null}  [props.operator2]
     * @param {number|null}  [props.operator3]
     * @param {number}        props.supervisor
     * @param {number|null}  [props.openingCount]
     * @param {number|null}  [props.closingCount]
     * @param {number|null}  [props.production]
     * @param {number|null}  [props.rejection]
     * @param {number|null}  [props.netProduction]
     * @param {string|null}  [props.incentive]
     * @param {string|null}  [props.less80Reason]
     * @param {boolean}      [props.isActive]
     * @param {boolean}      [props.isDeleted]
     * @param {number|null}  [props.createdBy]
     * @param {number|null}  [props.updatedBy]
     * @param {Date|null}    [props.createdAt]
     * @param {Date|null}    [props.updatedAt]
     */
    constructor(props) {
        this.shiftSequence = props.shiftSequence ?? null;
        this.shiftId = props.shiftId ?? null;
        this.companyId = props.companyId;
        this.productId = props.productId;
        this.machineId = props.machineId;
        this.orderId = props.orderId ?? null;
        this.shiftStartDate = props.shiftStartDate;
        this.shiftEndDate = props.shiftEndDate;
        this.entryType = props.entryType;
        this.shiftType = props.shiftType ?? null;
        this.shiftHours = props.shiftHours ?? null;
        this.operator1 = props.operator1;
        this.operator2 = props.operator2 ?? null;
        this.operator3 = props.operator3 ?? null;
        this.supervisor = props.supervisor;
        this.openingCount = props.openingCount ?? null;
        this.closingCount = props.closingCount ?? null;
        this.production = props.production ?? null;
        this.rejection = props.rejection ?? null;
        this.netProduction = props.netProduction ?? null;
        this.incentive = props.incentive ?? null;
        this.less80Reason = props.less80Reason ?? null;
        this.isActive = props.isActive ?? true;
        this.isDeleted = props.isDeleted ?? false;
        this.createdBy = props.createdBy ?? null;
        this.updatedBy = props.updatedBy ?? null;
        this.createdAt = props.createdAt ?? null;
        this.updatedAt = props.updatedAt ?? null;

        // Enforce invariants immediately on construction
        this._assertOperatorsDistinct();
    }

    _assertOperatorsDistinct() {
        const assigned = [
            { field: 'operator1', value: this.operator1 },
            { field: 'operator2', value: this.operator2 },
            { field: 'operator3', value: this.operator3 },
        ].filter((o) => o.value !== null && o.value !== undefined);

        const seen = new Map();
        for (const { field, value } of assigned) {
            if (seen.has(value)) throw new DuplicateOperatorError(field, value);
            seen.set(value, field);
        }
    }

    // Only runs when all count fields are present (they are recorded in a separate step)
    _assertProductionCounts(incentiveLimit) {
        const { openingCount, closingCount, production, rejection, netProduction } = this;

        if ([openingCount, closingCount, production, rejection, netProduction]
            .some((v) => v === null || v === undefined)) return;

        if (openingCount < 0)  throw new NegativeCountError('openingCount', openingCount);
        if (closingCount < 0)  throw new NegativeCountError('closingCount', closingCount);
        if (production < 0)    throw new NegativeCountError('production', production);
        if (rejection < 0)     throw new NegativeCountError('rejection', rejection);
        if (netProduction < 0) throw new NegativeCountError('netProduction', netProduction);

        if (production !== closingCount - openingCount)
            throw new ProductionMismatchError(closingCount, openingCount, production);

        if (rejection > production)
            throw new RejectionExceedsProductionError(rejection, production);

        if (netProduction !== production - rejection)
            throw new NetProductionMismatchError(production, rejection, netProduction);

        if (incentiveLimit !== null && incentiveLimit !== undefined) {
            if (netProduction < incentiveLimit && (!this.less80Reason || this.less80Reason.trim() === ''))
                throw new MissingIncentiveReasonError();
        }
    }

    // Derives production, netProduction and incentive from raw counts.
    // incentiveLimit is supplied by the service (cross-aggregate lookup).
    recordProduction({ openingCount, closingCount, rejection, less80Reason }, incentiveLimit) {
        this.openingCount  = openingCount;
        this.closingCount  = closingCount;
        this.rejection     = rejection;
        this.production    = closingCount - openingCount;
        this.netProduction = this.production - rejection;
        this.incentive     = this.netProduction >= incentiveLimit ? 'Y' : 'N';
        this.less80Reason  = less80Reason ?? null;

        this._assertProductionCounts(incentiveLimit);
    }

    applyUpdate(changes, updatedBy, incentiveLimit = null) {
        const updatableFields = [
            'orderId', 'productId', 'machineId',
            'shiftStartDate', 'shiftEndDate',
            'entryType', 'shiftType', 'shiftHours',
            'operator1', 'operator2', 'operator3', 'supervisor',
            'openingCount', 'closingCount', 'production',
            'rejection', 'netProduction', 'incentive', 'less80Reason',
        ];

        for (const field of updatableFields) {
            if (Object.prototype.hasOwnProperty.call(changes, field)) {
                this[field] = changes[field];
            }
        }

        this.updatedBy = updatedBy;
        this.updatedAt = new Date();

        this._assertOperatorsDistinct();
        this._assertProductionCounts(incentiveLimit);
    }

    delete(updatedBy) {
        this.isDeleted = true;
        this.isActive = false;
        this.updatedBy = updatedBy;
        this.updatedAt = new Date();
    }

    // ─── Snapshot (plain object for persistence) ────────────────────────────

    /**
     * Returns a plain object safe to pass to a Sequelize create/update.
     * Keeps the entity decoupled from the ORM — the repository calls this,
     * not the entity itself.
     *
     * @returns {object}
     */
    toPlainObject() {
        return {
            shiftSequence: this.shiftSequence,
            shiftId: this.shiftId,
            companyId: this.companyId,
            productId: this.productId,
            machineId: this.machineId,
            orderId: this.orderId,
            shiftStartDate: this.shiftStartDate,
            shiftEndDate: this.shiftEndDate,
            entryType: this.entryType,
            shiftType: this.shiftType,
            shiftHours: this.shiftHours,
            operator1: this.operator1,
            operator2: this.operator2,
            operator3: this.operator3,
            supervisor: this.supervisor,
            openingCount: this.openingCount,
            closingCount: this.closingCount,
            production: this.production,
            rejection: this.rejection,
            netProduction: this.netProduction,
            incentive: this.incentive,
            less80Reason: this.less80Reason,
            isActive: this.isActive,
            isDeleted: this.isDeleted,
            createdBy: this.createdBy,
            updatedBy: this.updatedBy,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}

module.exports = ProductionShiftEntity;
