import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import OrderService from './order.service';
import IsAuthorized from 'src/guards/isAuthorized';
import CreateOrderDto from 'src/dto/create-order.dto';
import 'dotenv/config';
import { Request } from 'express';
import decodeJwt from 'src/utils/decodeJwt';

@Controller('/order')
export default class OrderController {
  constructor(private service: OrderService) {}

  @Post()
  @UseGuards(new IsAuthorized())
  async create(@Body() order: CreateOrderDto, @Req() req: Request) {
    return await this.service.create(decodeJwt(req) as any, order);
  }
}
