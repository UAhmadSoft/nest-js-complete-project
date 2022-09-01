import { Injectable, Req } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/user.schema';
import { APIFeatures } from './apiFeatures.js';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private lazyModuleLoader: LazyModuleLoader,
  ) // private apiFeatures: APIFeatures,
  {}

  async getAll(req: any) {
    const query = new APIFeatures(this.userModel.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate().query;

    const users = await query;
    // console.log('req.user', req.user);
    return users;
  }

  async findOne(email) {
    const users = await this.userModel.findOne({ email }).select('+password');
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
