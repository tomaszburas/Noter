import passportJwt from 'passport-jwt';
import passport from 'passport';
import {ACCESS_TOKEN} from "../config.js";
import {UserRecord} from "../db/records/user.record.js";

const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) token = req.cookies['access_token'];
    return token;
};

const opts = {};
const JwtStrategy = passportJwt.Strategy;

opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = ACCESS_TOKEN;

passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    const user = await UserRecord.getUser(jwt_payload.id);
    user ? done(null, user) : done(null, false);
}));
