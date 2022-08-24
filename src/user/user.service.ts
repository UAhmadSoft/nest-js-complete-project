import { Injectable, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async getAll() {
    const users = await this.userModel.find();
    return users;
  }

  async getOne(id: any) {
    const users = await this.userModel.findById(id);
    return users;
  }

  async deleteOne(id: any) {
    const users = await this.userModel.findByIdAndDelete(id);
    return users;
  }
}
