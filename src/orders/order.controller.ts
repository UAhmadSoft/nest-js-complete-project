import { OrderService } from './order.service';
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
import { Roles } from 'src/decorators/roles.decorator';

@Controller('orders')
export class OrderController {
  constructor(
    private orderService: OrderService,
    private userService: UserService,
  ) {}

  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  async getAllOrders(@GetUser() user, @Req() req): Promise<any> {
    // console.log('req.user', req.user);
    // console.log('user', user);
    const orders = await this.orderService.getAll(user, req);
    return {
      status: 'success',
      results: orders.length,
      orders,
    };
  }

  @Get(':id')
  getOrder(@Param() params): any {
    return this.orderService.getOne(params.id);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  deleteOrder(@Param() params, @GetUser() user): any {
    return this.orderService.deleteOne(params.id, user._id);
  }

  @Post('/')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  createOrder(@Body() body, @GetUser() user): any {
    // this.us;
    return this.orderService.createOne(body, user);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  updateOrder(@Param() params: any, @Body() body: any) {
    return this.orderService.updateOne(params.id, body);
  }
}
