import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignorExpiration: false,
      secretOrKey: process.env.SECRETKEY,
    });
  }

  async validate(payload: any) {
    return { usedId: payload.sub, email: payload.email, role: payload.role };
  }
}