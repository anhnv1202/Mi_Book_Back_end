import AuthRepository from '@repository/auth.repository';
import passport from 'passport';
import passportGoogle from 'passport-google-oauth20';
import { Config } from './common.config';
const GoogleStrategy = passportGoogle.Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: Config.GOOGLE_CLIENT_ID,
      clientSecret: Config.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/v1/auth/google/redirect',
      scope: ['profile', 'email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await AuthRepository.findOneBy({ googleId: profile.id });
      if (!user) {
        const newUser = await AuthRepository.save({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails?.[0].value,
          username: profile.name.givenName,
        });
        if (newUser) {
          done(null, newUser);
        }
      } else {
        done(null, user);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  done(null, user);
});
export default passport;
