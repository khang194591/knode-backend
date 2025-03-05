import { UsersService } from '@/modules/users/users.service';
import { ConflictException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthService } from '../auth.service';
import { SignUpDto } from '../dto';

export class SignUpCommand {
  constructor(public readonly dto: SignUpDto) {}
}

@CommandHandler(SignUpCommand)
export class SignUpHandler implements ICommandHandler<SignUpCommand> {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  async execute({ dto }: SignUpCommand): Promise<any> {
    const { email, password } = dto;

    const existingUser = await this.userService.findByEmail(email);

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await this.authService.hashPassword(password);

    const user = await this.userService.create({
      email,
      hashedPassword,
    });

    return this.authService.generateToken(user);
  }
}
