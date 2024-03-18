import { Injectable } from '@nestjs/common';
import CreateFeedbackDto from 'src/dto/create-feedback.dto';
import prisma from 'src/prisma';

@Injectable()
export default class FeedbackService {
  async create(user: { id: number }, feedback: CreateFeedbackDto) {
    return await prisma.feedback.create({
      data: { ...feedback, userId: user.id } as any,
    });
  }
}
