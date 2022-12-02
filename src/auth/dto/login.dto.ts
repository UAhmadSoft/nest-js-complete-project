import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'someone@example.com',
    description: 'First Name of the user',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

// Calculator Example
