import { Public } from '@/shared/decorators';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignInResDto, SignUpDto, SignUpResDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto): Promise<SignUpResDto> {
    return this.authService.signUp(signUpDto);
  }

  @Public()
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto): Promise<SignInResDto> {
    return this.authService.signIn(signInDto);
  }
}
