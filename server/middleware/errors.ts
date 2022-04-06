import { NextFunction, Request, Response } from 'express';
import { MySqlError } from '../types';

export class ValidateError extends Error {}

export const handleError = (
    err: MySqlError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    let message = '';

    if (err.sqlState) {
        message = 'Database problem';
    }

    if (err.errno === 1062) {
        message = 'A user with this username exists in our database';
    }

    if (err instanceof ValidateError) {
        message = err.message;
    }

    res.status(
        err instanceof ValidateError || err.errno === 1062 ? 400 : 500
    ).json({
        success: false,
        message: message ? message : 'Sorry, please try again in a while',
    });
};
