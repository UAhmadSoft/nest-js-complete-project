import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { Match } from 'src/decorators/match.decorator';

@Schema({
  timestamps: true,
  toJSON: {
    transform: function (doc, ret, options) {
      delete ret.__v;
      delete ret.password;
      return ret;
    },
  },
  toObject: {
    transform: function (doc, ret, options) {
      delete ret.__v;
      delete ret.password;
      return ret;
    },
  },
})
export class User {
  @Prop()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Prop()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @Prop({
    required: true,
    type: String,
    lowercase: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop({
    default: 'user',
    type: String,
    lowercase: true,
    enum: ['admin', 'user'],
  })
  @IsString()
  @IsNotEmpty()
  role: string;

  @Prop()
  @IsNotEmpty()
  @IsString()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
