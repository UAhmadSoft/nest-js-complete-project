import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoModule } from './todos/todos.module';
import { LoggerMiddleware } from './middlewares/logger';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { NotificationsGateway } from './notifications.gateway';
import { StripeModule } from 'nestjs-stripe';
import { APIFeatures } from './helpers/apiFeatures';
import { ProductModule } from './products/product.module';
import { OrderModule } from './orders/order.module';
import { Order, OrderSchema } from './orders/order.schema';
import { AllExceptionsFilter } from './helpers/all-exceptions-filter';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema,
      },
    ]),
    StripeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        apiKey: configService.get('STRIPE_SECRET_KEY'),
        apiVersion: '2022-08-01',
      }),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRoot({
      ttl: 60 * 60 * 1000, // 1 minute
      limit: 100,
    }),
    // LoggerModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['config.env'],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('DB_URI'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    TodoModule,
    ProductModule,
    OrderModule,
  ],
  controllers: [],
  providers: [
    APIFeatures,
    NotificationsGateway,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        { path: 'users', method: RequestMethod.GET },
        { path: 'auth/login', method: RequestMethod.POST },
      );
  }
}
