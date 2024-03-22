import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import ProductService from './product.service';
import ProductDto from 'src/dto/product.dto';
import IsAuthorized from 'src/guards/isAuthorized';

@Controller('/product')
export default class ProductController {
  constructor(private service: ProductService) {}

  @Get()
  async get(@Req() req: Request) {
    const filters = req.query;
    const fields = ['name', 'minPrice', 'maxPrice', 'type', 'line', 'take'];
    Object.keys(filters).map(
      (e) =>
        String(filters[e]).trim() == '' ||
        (!fields.includes(e) && delete filters[e]),
    );
    return await this.service.get(filters);
  }

  @Post()
  @UseGuards(new IsAuthorized('admin'))
  async create(@Body() data: ProductDto) {
    return this.service.create(data);
  }

  @Put('/:id')
  @UseGuards(new IsAuthorized('admin'))
  async update(
    @Body() data: Partial<ProductDto>,
    @Req() req: Request,
    @Res() res: Response, // when you got the response here you have to return with this response otherway will not return
  ) {
    if (Object.keys(data).length == 0) {
      return res
        .status(400)
        .json({ message: 'Pass some valid data to update a product' });
    }
    return res
      .status(200)
      .json(await this.service.update(+req.params.id, data));
  }

  @Delete('/:id')
  @UseGuards(new IsAuthorized('admin'))
  async remove(@Req() req: Request, @Res() res: Response) {
    await this.service.remove(+req.params.id);
    return res.status(204).json(null);
  }

  @Get('/:id')
  async getById(@Req() req: Request) {
    return await this.service.getById(+req.params.id);
  }
}
