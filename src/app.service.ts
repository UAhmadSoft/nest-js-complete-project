import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user/user.schema';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';
import { Order } from './orders/order.schema';
@Injectable()
export class AppService {
  constructor(
    // @InjectModel(User.name)
    // private userModel: Model<User>,

    @InjectModel(Order.name)
    private orderModel: Model<Order>,
    private configService: ConfigService,
    @InjectStripe() private readonly stripeClient: Stripe,
  ) {}

  async stripeWebhook(req: any) {
    const webhookSecret = this.configService.get('STRIPE_WEBHOOK_SECRET');

    const sig = req.headers['stripe-signature'];

    console.log('req.body', req.body);
    let event;

    try {
      event = this.stripeClient.webhooks.constructEvent(
        req.body,
        sig,
        webhookSecret,
      );
    } catch (err) {
      console.log('err', err);
      throw new UnauthorizedException('Webhook Error:', err.message);
    }

    // Handle the event
    const data = event.data.object;
    console.log('data', data);
    console.log('event.type', event.type);

    switch (event.type) {
      case 'checkout.session.completed':
        console.log('checkout.session.completed');

        const order = await this.orderModel.findByIdAndUpdate(
          data.metadata.orderId,
          {
            paid: true,
            paidAt: new Date(),
          },
        );

        console.log('order', order);

        // Then define and call a function to handle the event checkout.session.completed
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
