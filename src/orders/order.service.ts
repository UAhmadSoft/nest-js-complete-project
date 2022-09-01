import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InjectStripe } from 'nestjs-stripe';
import { Order } from 'src/orders/order.schema';
import { Product } from 'src/products/product.schema.js';
import Stripe from 'stripe';
// import { APIFeatures } from './apiFeatures.js';
import { APIFeatures } from '../helpers/apiFeatures.js';

@Injectable()
export class OrderService {
  constructor(
    // private lazyModuleLoader: LazyModuleLoader, // private apiFeatures: APIFeatures,
    // @InjectModel(User.name)
    // private userModel: Model<User>,
    // private userService: UserService,
    @InjectModel(Order.name)
    private orderModel: Model<Order>,
    @InjectStripe() private readonly stripeClient: Stripe,
  ) {}

  async getAll(user: any, req: any) {
    const query = new APIFeatures(this.orderModel.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate().query;

    if (user.role !== 'admin')
      query.find({ $or: [{ buyer: user._id }, { seller: user._id }] });

    const orders = await query;
    // console.log('req.user', req.user);
    return orders;
  }

  async createOne(body: any, user: any) {
    const orders = await this.orderModel.create({
      ...body,
      buyer: user._id,
    });
    return orders;
  }

  async updateOne(id: any, body: Body) {
    const orders = await this.orderModel.findByIdAndUpdate(
      id,
      {
        ...body,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!orders)
      throw new NotFoundException(`Could not find product with id${id}.`);
    return orders;
  }

  async getOne(id: any) {
    const orders = await this.orderModel.findById(id);
    return orders;
  }

  async makePayment(product: Product) {
    const session = await this.stripeClient.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
            },
            unit_amount: product.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
    });
    return session.url;
  }

  async deleteOne(id: any, userId: any) {
    const orders = await this.orderModel.findOneAndDelete({
      _id: id,
      user: userId,
    });
    if (!orders)
      throw new NotFoundException(`Could not find product with id${id}.`);
    return orders;
  }
}
