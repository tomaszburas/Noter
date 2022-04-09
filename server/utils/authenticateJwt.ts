import passport from 'passport';
import { AuthError } from '../middleware/errors.js';
import { NextFunction, Request, Response } from 'express';

export const authenticateJwt = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) return next(err);
        if (!user) throw new AuthError();
        req.user = user;
        next();
    })(req, res, next);
};
