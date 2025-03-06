import { User } from '@/entities';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

export interface IToken {
  payload: IUserPayload;
  accessToken: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(user: User): Promise<IToken> {
    const member = user.profiles[0];

    const payload: IUserPayload = {
      id: user.id,
      email: user.email,
      roleId: member.roleId || '',
      memberId: member.id,
      permissions: member.role.permissions.map(({ name }) => name),
      organizationId: member.organizationId || '',
    };

    const accessToken = await this.jwtService.signAsync(payload);
    return { payload, accessToken };
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async compareHashPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
