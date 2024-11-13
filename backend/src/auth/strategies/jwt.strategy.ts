import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { Auth } from '../entities/auth.entity';

@Injectable()
export class JwtStrategies extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,

    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<Auth> {
    const { id } = payload;

    const auth = await this.authRepository.findOneBy({ id });

    if (!auth) throw new UnauthorizedException('Token not valid');
    if (!auth.isActive)
      throw new UnauthorizedException(
        'User is inactive, talk to the administrator',
      );

    return auth;
  }
}
