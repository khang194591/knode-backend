import { IsPublic } from '@/shared/decorators';
import { extractToken } from '@/shared/utils';
import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Request } from 'express';
import {
  SignInCommand,
  SignUpCommand,
  SwitchOrganizationCommand,
} from './commands';
import {
  SignInDto,
  SignInResDto,
  SignUpDto,
  SignUpResDto,
  SwitchOrganizationDto,
} from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @IsPublic()
  @Post('sign-up')
  async signUp(@Body() dto: SignUpDto): Promise<SignUpResDto> {
    return this.commandBus.execute(new SignUpCommand(dto));
  }

  @IsPublic()
  @Post('sign-in')
  async signIn(@Body() dto: SignInDto): Promise<SignInResDto> {
    return this.commandBus.execute(new SignInCommand(dto));
  }

  @Post('switch-organization')
  async switchOrganization(
    @Req() req: Request,
    @Body() dto: SwitchOrganizationDto,
  ) {
    const token = extractToken(req);

    if (!token) {
      throw new UnauthorizedException();
    }

    return this.commandBus.execute(new SwitchOrganizationCommand(token, dto));
  }
}
