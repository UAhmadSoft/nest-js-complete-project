import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    public authService: AuthService,
    public configService: ConfigService,
    public userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
      // passReqToCallback: true,
      // secretOrKey: authService.getConfig('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    const user = await this.userService.getOne(payload._id);
    console.log('user', user);
    return user;
    // return { id: payload._id };
  }
}
