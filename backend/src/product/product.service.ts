import { BadRequestException, Injectable } from '@nestjs/common';
import ProductDto from 'src/dto/product.dto';
import prisma from 'src/prisma';

@Injectable()
export default class ProductService {
  async get(filters) {
    const { name, minPrice, maxPrice, type, line } = filters;
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
        line,
      },
      take: 10,
    });
  }

  async create(data: ProductDto) {
    return await prisma.product.create({
      data: data as any,
    });
  }

  async update(id: number, data: Partial<ProductDto>) {
    try {
      return await prisma.product.update({
        data,
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException({ message: 'invalid data' });
    }
  }

  async remove(id: number) {
    return prisma.product.delete({
      where: { id },
    });
  }
}
