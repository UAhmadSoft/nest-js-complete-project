import { UserService } from './user.service';
import {
  Controller,
  Delete,
  Get,
  Param,
  ParamData,
  Patch,
  Post,
  Req,
  SetMetadata,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { JwtAuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { GetUser } from 'src/decorators/user.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileSizeValidationPipe } from 'src/pipes/FileValidationPipe';

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

  @Patch('photo')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(FileSizeValidationPipe)
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('file', file);
  }
}
