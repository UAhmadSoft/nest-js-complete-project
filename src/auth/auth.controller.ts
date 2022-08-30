import { AuthService } from './auth.service';
import {
  Get,
  Controller,
  Post,
  Req,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginDto } from '../auth/dto/login.dto';
import { SignupDto } from '../auth/dto/signup.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() authDto: LoginDto): Promise<Object> {
    const { token, user } = await this.authService.login(authDto);

    return { user, token, status: 'success' };
  }

  @Post('signup')
  @UsePipes(ValidationPipe)
  async signup(@Body() authDto: SignupDto): Promise<any> {
    return this.authService.signup(authDto);
  }
}
