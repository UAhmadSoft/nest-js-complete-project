import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Match } from 'src/decorators/match.decorator';

export class TodoDto {
  @IsEmail()
  @IsNotEmpty()
  task: string;

  @IsBoolean()
  @IsNotEmpty()
  isComplete: boolean;
}
