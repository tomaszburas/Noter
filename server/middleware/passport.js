import passportJwt from 'passport-jwt';
import passport from 'passport';
import {ACCESS_TOKEN} from "../config.js";
import {UserRecord} from "../db/records/user.record.js";

const opts = {};
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = ACCESS_TOKEN;

passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    const user = await UserRecord.getUser(jwt_payload.id);
    user ? done(null, user) : done(null, false);
}));
