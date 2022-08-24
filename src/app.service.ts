import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user/user.schema';
import { Model } from 'mongoose';
@Injectable()
export class AppService {
  // constructor(
  //   @InjectModel(User.name)
  //   private userModel: Model<User>,
  // ) {}

  getHello(): string {
    return 'Hello World!';
  }
}
