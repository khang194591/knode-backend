import { UsersService } from '@/modules/users/users.service';
import { UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthService } from '../auth.service';
import { SignInDto, SignInResDto } from '../dto';

export class SignInCommand {
  constructor(public readonly dto: SignInDto) {}
}

@CommandHandler(SignInCommand)
export class SignInHandler implements ICommandHandler<SignInCommand> {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  async execute({ dto }: SignInCommand): Promise<SignInResDto> {
    const { email, password } = dto;

    let user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.authService.compareHashPassword(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    user = await this.userService.findUserWithPermissionByEmail(email);

    return this.authService.generateToken(user);
  }
}
