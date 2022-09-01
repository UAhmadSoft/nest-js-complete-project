import { User, UserSchema } from 'src/user/user.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/products/product.schema';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { OrderModule } from 'src/orders/order.module';
import { OrderService } from 'src/orders/order.service';
import { Order, OrderSchema } from 'src/orders/order.schema';

@Module({
  imports: [
    UserModule,
    OrderModule,
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Order.name,
        schema: OrderSchema,
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService, UserService, OrderService],
})
export class ProductModule {}
