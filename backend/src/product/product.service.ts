import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import ProductDto from 'src/dto/product.dto';
import prisma from 'src/prisma';

@Injectable()
export default class ProductService {
  async get(filters) {
    const { name, minPrice, maxPrice, type, line, take } = filters;
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
      take: +take,
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
    return await prisma.product.delete({
      where: { id },
    });
  }

  async getById(id: number) {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        size: true,
        // feedbacks: true, much data
      },
    });
    if (!product) throw new NotFoundException({ message: 'product not found' });
    const rate = await prisma.feedback.aggregate({
      where: { productId: id },
      _avg: {
        rate: true,
      },
      _count: {
        rate: true,
      },
    });
    return { ...product, rate };
  }
}
