import { Injectable, Req } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InjectStripe } from 'nestjs-stripe';
import { User } from 'src/user/user.schema';
import Stripe from 'stripe';
import { APIFeatures } from './apiFeatures.js';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private lazyModuleLoader: LazyModuleLoader, // private apiFeatures: APIFeatures,
    @InjectStripe() private readonly stripeClient: Stripe,
  ) {}

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

  async makePayment() {
    const session = this.stripeClient.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'T-shirt',
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
    });
    return session;
  }

  async deleteOne(id: any) {
    const users = await this.userModel.findByIdAndDelete(id);
    return users;
  }
}
