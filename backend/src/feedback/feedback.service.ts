import { Injectable } from '@nestjs/common';
import CreateFeedbackDto from 'src/dto/create-feedback.dto';
import prisma from 'src/prisma';

@Injectable()
export default class FeedbackService {
  async create(user: { id: string }, feedback: CreateFeedbackDto) {
    return await prisma.feedback.create({
      data: { ...feedback, userId: user.id } as any,
    });
  }

  async isRated(userId: string, productId: number) {
    const res = await prisma.feedback.findMany({
      where: {
        userId,
        productId,
      },
    });
    return res.length > 0 ? { message: 'rated' } : { message: 'not rated' };
  }
}
