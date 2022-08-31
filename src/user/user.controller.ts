import { UserService } from './user.service';
import {
  Controller,
  Delete,
  Get,
  Param,
  ParamData,
  Post,
  Req,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { JwtAuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { GetUser } from 'src/decorators/user.decorator';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  getAllUsers(): any {
    // getAllUsers(@GetUser() user, @Req() req): any {
    // console.log('req.user', req.user);
    // console.log('user', user);
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
