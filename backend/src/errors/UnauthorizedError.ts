const { Error } = require('./Error');

class UnauthorizedError extends Error {
    constructor(message: string) {
        super(message);
        this.statusCode = 401;
    }
}

export default UnauthorizedError;
