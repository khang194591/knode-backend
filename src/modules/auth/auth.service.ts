import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { User } from '../users/entities/user.entity';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

export interface IToken {
  accessToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  private generateToken(user: User): { accessToken: string } {
    const payload: IUserPayload = {
      email: user.email,
      sub: user.id,
      role: user.role.name,
      permissions: user.role.permissions.map((permission) => permission.name),
    };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  async signUp(signUpDto: SignUpDto): Promise<IToken> {
    const { email, password } = signUpDto;

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const user = this.userRepository.create({
      email,

      password: await bcrypt.hash(password, 10),
    });
    await this.userRepository.save(user);

    return this.generateToken(user);
  }

  async signIn(signInDto: SignInDto): Promise<IToken> {
    const { email, password } = signInDto;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateToken(user);
  }
}
