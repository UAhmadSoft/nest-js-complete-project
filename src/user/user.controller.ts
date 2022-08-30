import { UserService } from './user.service';
import {
  Controller,
  Delete,
  Get,
  Param,
  ParamData,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  getAllUsers(): any {
    return this.userService.getAll();
  }

  @Get(':id')
  getUser(@Param() params): any {
    return this.userService.getOne(params.id);
  }

  @Delete(':id')
  deleteUser(@Param() params): any {
    return this.userService.deleteOne(params.id);
  }
}
