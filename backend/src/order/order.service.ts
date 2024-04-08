import { Injectable } from '@nestjs/common';
import CreateOrderDto from 'src/dto/create-order.dto';
import OrderProduct from 'src/dto/order-product.dto';
import prisma from 'src/prisma';

@Injectable()
export default class OrderService {
  async create(user: { id: number }, order: CreateOrderDto) {
    const products = order.products;
    delete order.products;
    const newOrder = await prisma.order.create({
      data: { ...order, userId: user.id } as any,
    });

    products.forEach(async (e: OrderProduct) => {
      await prisma.orderProduct.create({
        data: { ...e, orderId: newOrder.id } as any,
      });
    });

    return newOrder;
  }

  async get(userId: number, startIn: number) {
    return prisma.order.findMany({
      where: {
        userId,
      },
      skip: startIn,
      take: 5,
    });
  }

  async getById(orderId) {
    return prisma.orderProduct.findMany({
      where: {
        orderId,
      },
      include: { product: true },
    });
  }
}
