import { UserService } from './user.service';
import {
  Controller,
  Delete,
  Get,
  Param,
  ParamData,
  Post,
} from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
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
