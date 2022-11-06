const { Error } = require('./Error');

class BadRequestError extends Error {
    constructor(message: string) {
        super(message);
        this.statusCode = 400;
    }
}

export default BadRequestError;
