import { APIFeatures } from 'src/user/apiFeatures';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/user.schema';
import bcrypt from 'bcryptjs';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { LoggerMiddleware } from 'src/middlewares/logger';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
