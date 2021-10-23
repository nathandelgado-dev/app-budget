class Income extends Data {
    static incomeCount = 0;

    constructor(description, value) {
        super(description, value);
        this._id = ++Income.incomeCount;
    }
    get id() {
        return this._id;
    }
}