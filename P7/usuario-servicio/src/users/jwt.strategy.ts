import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
          jwtFromRequest: ExtractJwt.fromExtractors([(req) => {
            return req?.cookies?.jwt; // Extraer token de la cookie
          }]),
          ignoreExpiration: false,
          secretOrKey: 'secreto1234',
        });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
