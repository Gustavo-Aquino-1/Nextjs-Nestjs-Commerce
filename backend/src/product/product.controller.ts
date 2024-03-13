import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import ProductService from './product.service';
import ProductDto from 'src/dto/product.dto';
import IsAdmin from 'src/guards/IsAdmin';

@Controller('/product')
export default class ProductController {
  constructor(private service: ProductService) {}

  @Get()
  async get(@Req() req: Request) {
    const filters = req.query;
    const fields = ['name', 'minPrice', 'maxPrice', 'type'];
    Object.keys(filters).map(
      (e) =>
        String(filters[e]).trim() == '' ||
        (!fields.includes(e) && delete filters[e]),
    );
    return await this.service.get(filters);
  }

  @Post()
  @UseGuards(IsAdmin)
  async create(@Body() data: ProductDto) {
    return this.service.create(data);
  }
}
