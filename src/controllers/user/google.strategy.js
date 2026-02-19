import { Strategy } from "passport-google-oauth20";
import { User } from "../../models/index.js";

export default function (passport) {
    passport.use(
        new Strategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: process.env.GOOGLE_CALLBACK_URL
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const user = await User.findOne({ providerId: profile.id });

                    if(user) return done(null, user);

                    const newUser = await User.create({
                        fullName: profile.displayName,
                        email: profile.emails[0].value,
                        avatarUrl: profile.photos[0].value,
                        authProvider: "google",
                        providerId: profile.id,
                    });

                    return done(null, newUser);
                } catch (error) {
                    console.log("Error in passport.js: ", error);
                    return done(error, null);
                }
            }
        )
    )
}