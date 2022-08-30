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

  validateRequest(username: string, password: string): Boolean {
    // const user = await this.usersService.getUser({ username });
    // if (!user) return null;
    // const passwordValid = await bcrypt.compare(password, user.password);
    // if (!user) {
    //   throw new NotAcceptableException('could not find the user');
    // }
    // if (user && passwordValid) {
    //   return user;
    // }
    // return null;

    return false;
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
