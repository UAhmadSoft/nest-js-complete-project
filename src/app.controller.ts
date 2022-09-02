import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/webhook')
  async webhook(@Req() req: Request) {
    return this.appService.stripeWebhook(req);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
