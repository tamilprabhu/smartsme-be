const crypto = require('crypto');

const ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"; // Crockford Base32 (no I, L, O, U)

function randomBody(len) {
    let s = "";
    for (let i = 0; i < len; i++) {
        s += ALPHABET[crypto.randomInt(0, ALPHABET.length)];
    }
    return s;
}

function checksum(str) {
    let sum = 0;
    for (let i = 0; i < str.length; i++) {
        sum += ALPHABET.indexOf(str[i]) * (i + 1);
    }
    return ALPHABET[sum % 32];
}

function generateCompanyId() {
    const body = randomBody(9);
    return `CMP${body}${checksum(body)}`;
}

function generateProductId() {
    const body = randomBody(9);
    return `PRD${body}${checksum(body)}`;
}

function generateOrderId() {
    const body = randomBody(9);
    return `ORD${body}${checksum(body)}`;
}

function generateInvoiceId() {
    const body = randomBody(9);
    return `INV${body}${checksum(body)}`;
}

function generateMachineId() {
    const body = randomBody(9);
    return `MCH${body}${checksum(body)}`;
}

function generateBuyerId() {
    const body = randomBody(9);
    return `BYR${body}${checksum(body)}`;
}

function generateDispatchId() {
    const body = randomBody(9);
    return `DSP${body}${checksum(body)}`;
}

function generateShiftId() {
    const body = randomBody(9);
    return `SFT${body}${checksum(body)}`;
}

function generateSellerId() {
    const body = randomBody(9);
    return `SLR${body}${checksum(body)}`;
}

function generateStockId() {
    const body = randomBody(9);
    return `STK${body}${checksum(body)}`;
}

function generateEmployeeId() {
    const body = randomBody(9);
    return `EMP${body}${checksum(body)}`;
}

module.exports = {
    generateCompanyId,
    generateProductId,
    generateOrderId,
    generateInvoiceId,
    generateMachineId,
    generateBuyerId,
    generateDispatchId,
    generateShiftId,
    generateSellerId,
    generateStockId,
    generateEmployeeId
};
