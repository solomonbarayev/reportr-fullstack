const { Error } = require('./Error');

class ConflictError extends Error {
    constructor(message: string) {
        super(message);
        this.statusCode = 409;
    }
}
export default ConflictError;
