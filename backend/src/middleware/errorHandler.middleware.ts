import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;

    const message = statusCode === 500 ? 'An error has occurred on the server' : err.message;
    res.status(statusCode).send({ message });
    next();
};

export default errorHandler;
