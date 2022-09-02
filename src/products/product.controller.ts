import { ProductService } from './product.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { RolesGuard } from 'src/auth/roles.guard';
import { Request } from 'express';
import { GetUser } from 'src/decorators/user.decorator';
import { UserService } from 'src/user/user.service';
import { OrderService } from 'src/orders/order.service';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('products')
export class ProductController {
  constructor(
    private productServices: ProductService,
    private orderService: OrderService,
  ) {}

  @Get('/')
  async getAllProducts(@Req() req: Request): Promise<any> {
    // getAllProducts(@GetProduct() user, @Req() req): any {
    // console.log('req.user', req.user);
    // console.log('user', user);
    const products = await this.productServices.getAll(req);
    return {
      status: 'success',
      results: products.length,
      products,
    };
  }

  @Get(':id')
  getProduct(@Param() params): any {
    return this.productServices.getOne(params.id);
  }

  @Delete(':id')
  // @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  deleteProduct(@Param() params, @GetUser() user): any {
    return this.productServices.deleteOne(params.id, user._id);
  }

  @Post('/')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  createProduct(@Body() body, @GetUser() user): any {
    // this.us;
    return this.productServices.createOne(body, user);
  }

  @Post('/:id/purchase')
  @Roles('user')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async purchaseProduct(@Param() params, @GetUser() user): Promise<any> {
    const product = await this.productServices.purchaseProduct(params.id);

    const order = await this.orderService.createOne(
      {
        product: product._id,
        seller: product.user,
      },
      user,
    );

    const url = await this.orderService.makePayment(product, order.id);

    return {
      status: 'success',
      url,
      order,
    };
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  updateProduct(@Param() params: any, @Body() body: any) {
    return this.productServices.updateOne(params.id, body);
  }
}
