const { Error } = require('./Error');

class ForbiddenError extends Error {
    constructor(message: string) {
        super(message);
        this.statusCode = 403;
    }
}

export default ForbiddenError;
