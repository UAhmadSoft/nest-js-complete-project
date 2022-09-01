import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsBoolean, IsDate, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';
import { User } from 'src/user/user.schema';
import { Product } from 'src/products/product.schema';

@Schema({
  timestamps: true,
})
export class Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @IsNotEmpty()
  buyer: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @IsNotEmpty()
  seller: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  @IsNotEmpty()
  product: Product;

  @Prop({
    default: false,
    type: Boolean,
  })
  @IsBoolean()
  isPaid: boolean;

  @Prop({
    type: Date,
  })
  @IsDate()
  paidAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
