import { Injectable, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/user.schema';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
const bcrypt = require('bcryptjs');

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async signup(authDto: SignupDto) {
    console.log('authDto', authDto);
    const createdCat = new this.userModel(authDto);
    return createdCat.save();
  }

  async login(authDto: LoginDto) {
    const user = await this.userModel
      .findOne({ email: authDto.email })
      .select('+password');
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const isPasswordMatching = await bcrypt.compare(
      authDto.password,
      user.password,
    );
    if (!isPasswordMatching) {
      throw new Error('Invalid credentials');
    }
    return user;
  }
}
