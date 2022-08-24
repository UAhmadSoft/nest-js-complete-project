import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Match } from 'src/decorators/match.decorator';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  @Match('password')
  passwordConfirm: string;
}
