import passportJwt from 'passport-jwt';
import passport from 'passport';
import { Request } from 'express';
import { ACCESS_TOKEN } from '../config.js';
import { UserRecord } from '../db/records/user.record.js';
import { User } from '../types';

declare module 'express' {
    export interface Request {
        user: User;
    }
}

interface Options {
    jwtFromRequest: (req: Request) => string | null;
    secretOrKey: string;
}

const cookieExtractor = (req: Request): string | null => {
    let token = null;
    if (req && req.cookies) token = req.cookies['access_token'];
    return token;
};

const JwtStrategy = passportJwt.Strategy;

const opts: Options = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: ACCESS_TOKEN,
};

passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {
        const user = await UserRecord.getUser(jwt_payload.id);
        user ? done(null, user) : done(null, false);
    })
);
