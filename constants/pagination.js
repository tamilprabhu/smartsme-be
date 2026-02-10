class ItemsPerPage {
    static ONE = 1;
    static TEN = 10;
    static TWENTY_FIVE = 25;
    static FIFTY = 50;
    static HUNDRED = 100;
    static MAX = 1000;
    
    static getValidValues() {
        return [this.ONE, this.TEN, this.TWENTY_FIVE, this.FIFTY, this.HUNDRED, this.MAX];
    }
    
    static isValid(value) {
        return this.getValidValues().includes(parseInt(value));
    }
}

module.exports = ItemsPerPage;
