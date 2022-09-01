import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';
import mongoose from 'mongoose';
import { Match } from 'src/decorators/match.decorator';
import { User } from 'src/user/user.schema';

@Schema({
  timestamps: true,
})
export class Product {
  @Prop({
    required: true,
    type: String,
    trim: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop({
    required: true,
    type: String,
    trim: true,
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @IsNotEmpty()
  user: User;

  @Prop({
    default: true,
    type: Boolean,
  })
  @IsBoolean()
  inStock: boolean;

  @Prop({
    type: Number,
    required: true,
    set: (val) => Math.round(val * 100) / 100, // 4.666666, 466.6666, 466, 4.66
  })
  @IsNumber()
  price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
