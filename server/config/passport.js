
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const User = require("../Sequelize/db/Users");
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "secret",

};
module.exports = function (passport) {
  passport.use(
    new JwtStrategy(opts, async (payload, done) => {
      try {

        const user = await User.findByPk(payload.id);
        if (user) return done(null, user);
        return done(null, false);
      } catch (err) {
        return done(err, false);
      }
    }),
  );
};
