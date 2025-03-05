import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-facebook';
import { AuthService } from './auth.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.FACEBOOK_APP_ID,      // Facebook App ID
      clientSecret: process.env.FACEBOOK_APP_SECRET,  // Facebook App Secret
      callbackURL: 'http://localhost:3000/auth/facebook/redirect', // The callback URL after login
      scope: ['email'], // Requesting access to the user's email
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
    const { name, email, id } = profile; // Extracting name, email, and ID from the profile
    const user = {
      email: email,
      firstName: name.givenName,
      lastName: name.familyName,
      facebookId: id,
      accessToken: accessToken,
    };

    // Pass the user data to the AuthService to generate JWT token
    const payload = {
      email: user.email,
      facebookId: user.facebookId,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    done(null, payload);
  }
}
