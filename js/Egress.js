class Egress extends Data {
    static egressCount = 0;

    constructor(description, value) {
        super(description, value);
        this._id = ++Egress.egressCount;
    }
    get id() {
        return this._id;
    }
}