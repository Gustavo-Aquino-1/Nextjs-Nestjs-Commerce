import { Injectable } from '@nestjs/common';
import ProductDto from 'src/dto/product.dto';
import prisma from 'src/prisma';

@Injectable()
export default class ProductService {
  async get(filters) {
    const { name, minPrice, maxPrice, type } = filters;
    return await prisma.product.findMany({
      where: {
        name: {
          contains: name,
        },
        price: {
          gte: +minPrice || 0,
          lte: +maxPrice || 500000,
        },
        type,
      },
      take: 10,
    });
  }

  async create(data: ProductDto) {
    // return await prisma.product.create({
    //   data: data as any,
    // });
    return data;
  }
}
