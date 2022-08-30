import { Injectable, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import LoginInterface from 'src/intefaces/login';
import { User } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
const bcrypt = require('bcryptjs');

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private readonly jwtService: JwtService, // private jwtService: JwtService,
    private readonly usersService: UserService,
  ) {}

  async signup(authDto: SignupDto) {
    console.log('authDto', authDto);
    const createdCat = new this.userModel(authDto);
    return createdCat.save();
  }

  async login(authDto: LoginDto): Promise<LoginInterface> {
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

    const token = this.jwtService.sign({ _id: user._id });

    console.log('token', token);
    console.log('user', user);
    return Promise.resolve({ user, token });
    // return user;
  }
}
