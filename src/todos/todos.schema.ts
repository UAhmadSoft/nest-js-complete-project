import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { Match } from 'src/decorators/match.decorator';

@Schema({
  timestamps: true,
  toJSON: {
    transform: function (doc, ret, options) {
      delete ret.__v;
      return ret;
    },
  },
  toObject: {
    transform: function (doc, ret, options) {
      delete ret.__v;
      return ret;
    },
  },
})
export class Todo {
  @Prop({
    required: true,
    type: String,
  })
  @IsEmail()
  @IsNotEmpty()
  task: string;

  @Prop({
    default: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsNotEmpty()
  isComplete: boolean;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
