import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InjectStripe } from 'nestjs-stripe';
import { Product } from 'src/products/product.schema';
import { User } from 'src/user/user.schema.js';
import { UserService } from 'src/user/user.service.js';
import Stripe from 'stripe';
// import { APIFeatures } from './apiFeatures.js';
import { APIFeatures } from '../helpers/apiFeatures.js';

@Injectable()
export class ProductService {
  constructor(
    // private lazyModuleLoader: LazyModuleLoader, // private apiFeatures: APIFeatures,
    // @InjectModel(User.name)
    // private userModel: Model<User>,
    // private userService: UserService,
    @InjectModel(Product.name)
    private productModel: Model<Product>,
    @InjectStripe() private readonly stripeClient: Stripe,
  ) {}

  async getAll(req: any) {
    const query = new APIFeatures(this.productModel.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate().query;

    const products = await query;
    // console.log('req.user', req.user);
    return products;
  }

  async createOne(body: Body, user: any) {
    const products = await this.productModel.create({
      ...body,
      user: user._id,
    });
    return products;
  }

  async updateOne(id: any, body: Body) {
    const products = await this.productModel.findByIdAndUpdate(
      id,
      {
        ...body,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!products)
      throw new NotFoundException(`Could not find product with id${id}.`);
    return products;
  }

  async getOne(id: any) {
    const products = await this.productModel.findById(id);
    return products;
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

  async deleteOne(id: any, userId: any) {
    const products = await this.productModel.findOneAndDelete({
      _id: id,
      user: userId,
    });
    if (!products)
      throw new NotFoundException(`Could not find product with id${id}.`);
    return products;
  }
}
