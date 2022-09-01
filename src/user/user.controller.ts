import { UserService } from './user.service';
import {
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParamData,
  ParseFilePipe,
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
import { Request } from 'express';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getAllUsers(@Req() req: Request): Promise<any> {
    // getAllUsers(@GetUser() user, @Req() req): any {
    // console.log('req.user', req.user);
    // console.log('user', user);
    const users = await this.userService.getAll(req);
    return {
      status: 'success',
      results: users.length,
      users,
    };
  }

  @Get(':id')
  getUser(@Param() params): any {
    return this.userService.getOne(params.id);
  }

  @Delete(':id')
  deleteUser(@Param() params): any {
    return this.userService.deleteOne(params.id);
  }

  @Post('payment')
  makePayment() {
    return this.userService.makePayment();
  }

  @Patch('photo')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  // @UsePipes(FileSizeValidationPipe)
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 70 * 1000 }),
          new FileTypeValidator({ fileType: 'jpeg' }),
          // ... Set of file validator instances here
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log('file', file);
  }
}
