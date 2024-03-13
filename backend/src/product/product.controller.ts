import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import ProductService from './product.service';

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
}
