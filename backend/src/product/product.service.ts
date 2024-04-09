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
    const filter = {
      where: {
        name: {
          contains: name,
        },
        price: {
          gte: +minPrice || 0,
          lte: +maxPrice || 500000,
        },
      },
      take: +take || 5,
    } as any;
    if (type) filter.where.type = type;
    if (line) filter.where.line = line;
    return await prisma.product.findMany(filter);
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

  async favorite(productId: number, userId: string, check: string) {
    const filter = {
      where: {
        favoriteId: {
          userId,
          productId,
        },
      } as any,
    };
    const isFavorite = await prisma.favorite.findUnique(filter);
    if (isFavorite) {
      if (check == 'yes') {
        return 'yes';
      }
      await prisma.favorite.delete(filter);
      return 'not';
    }

    if (check == 'yes') return 'not';

    await prisma.favorite.create({ data: { productId, userId } });
    return 'yes';
  }

  async getFavorites(userId: string, startIn: number, take: number) {
    return await prisma.favorite.findMany({
      where: { userId },
      include: { product: true },
      skip: startIn,
      take,
    });
  }
}
