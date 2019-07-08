const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const {User} = require('../User/schema');

const opts = {}


opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done)=>{
            User.findById(jwt_payload.id)
            .then((user)=>{
                if (user) {
                    return done(null, user)
                }
                return done(null, false)
            })
            .catch((err)=>{
                console.log(err);
            })
        })
    )
}

