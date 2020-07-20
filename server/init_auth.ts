import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy } from "passport-local";
import { User } from "./entities/User";

function initPassport() {
  passport.use(
    new Strategy(async function (username, password, cb) {
      try {
        const user = await User.findOneOrFail({ username: username });
        const compareResult = await bcrypt.compare(password, user.password);
        if (!compareResult) {
          return cb(null, false);
        }
        user.strip();
        cb(null, user);
      } catch (err) {
        cb(err);
      }
    })
  );

  passport.serializeUser(function (user: User, cb) {
    cb(null, user.username);
  });

  passport.deserializeUser(async function (username: string, cb) {
    try {
      const user = await User.findOneOrFail({ username: username });
      user.strip();
      cb(null, user);
    } catch (err) {
      cb(err);
    }
  });
}

export { initPassport };
