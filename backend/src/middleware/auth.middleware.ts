const jwt = require('jsonwebtoken');
import { Response, NextFunction } from 'express';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import UnauthorizedError from '../errors/UnauthorizedError';
import { config } from '../config/config';

const auth = (req: RequestWithUser, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        throw new UnauthorizedError('You must log in.');
    }

    const token = authorization.replace('Bearer ', '');

    let payload = null;
    try {
        payload = jwt.verify(token, config.jwtSecret);
    } catch (err) {
        return res.status(401).json({ error: 'Unauthorized. You must be logged in.' });
    }

    req.user = { _id: payload._id };

    return next();
};

export default auth;
