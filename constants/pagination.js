class ItemsPerPage {
    static TEN = 10;
    static TWENTY_FIVE = 25;
    static FIFTY = 50;
    static HUNDRED = 100;
    static MAX = 100;
    
    static getValidValues() {
        return [this.TEN, this.TWENTY_FIVE, this.FIFTY, this.HUNDRED];
    }
    
    static isValid(value) {
        return this.getValidValues().includes(parseInt(value));
    }
}

module.exports = ItemsPerPage;
