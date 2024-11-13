import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto, LoginAuthDto } from './dto';
import { Auth } from './entities/auth.entity';
import { JwtPayload } from './interfaces';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,

    private readonly jwtService: JwtService,
  ) {}

  private handleDBErrors(errors: any): never {
    if (errors.code === '23505') throw new BadRequestException(errors.detail);
    console.log(errors);
    throw new InternalServerErrorException('Something went wrong');
  }

  private getJwt(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  async create(createAuthDto: CreateAuthDto) {
    try {
      const { password, ...authData } = createAuthDto;
      const auth = this.authRepository.create({
        ...authData,
        password: bcrypt.hashSync(password, 10),
      });
      await this.authRepository.save(auth);
      delete auth.password;
      return {
        ...auth,
        token: this.getJwt({ id: auth.id }),
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login(loginAuthDto: LoginAuthDto) {
    const { password, nickname } = loginAuthDto;
    const auth = await this.authRepository.findOne({
      where: { nickname },
      select: { nickname: true, password: true, id: true },
    });
    if (!auth) throw new UnauthorizedException('Invalid credentials');
    if (!bcrypt.compareSync(password, auth.password))
      throw new UnauthorizedException('Invalid credentials');
    return {
      ...auth,
      token: this.getJwt({ id: auth.id }),
    };
  }
}
