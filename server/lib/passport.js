import { Strategy as LocalStrategy } from "passport-local";
// import passportJWT from 'passport-jwt';

import bcrypt from "bcrypt";

import { db } from "./db";
import passport from "passport";

// import sgMail from '@sendgrid/mail';
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const strategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (username, password, done) => {
    db("users")
      .where({ email: username })
      .first()
      .then((user) => {
        console.log(user)
        if (!user) {
          return done(null, false, { message: "Unknown email." });
        }

        const hash = user.auth0_id.split("|")[1];
        bcrypt.compare(password, hash, function (err, result) {
          if (err) return done(null, false, { message: err.message });

          if (!result)
            return done(null, false, { message: "Incorrect password." });
          return done(null, user);
        });
      })
      .catch((err) => {
        return done(err);
      });
  }
);

// passport.use(
//   new JWTStrategy(
//     {
//       jwtfromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//       secretOrKey: Buffer.from(process.env.JWT_SECRET || "devSecret", "base64")
//     }, 
//     // async function(jwtPayload, cb){
//     //   const user = await Users.fi
//     // }
//   )
// )