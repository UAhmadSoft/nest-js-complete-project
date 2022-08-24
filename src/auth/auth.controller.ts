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

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() authDto: LoginDto): Promise<any> {
    return this.authService.login(authDto);
  }

  @Post('signup')
  @UsePipes(ValidationPipe)
  async signup(@Body() authDto: SignupDto): Promise<any> {
    return this.authService.signup(authDto);
  }
}
