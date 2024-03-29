import {
  Body,
  ConflictException,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import FeedbackService from './feedback.service';
import CreateFeedbackDto from 'src/dto/create-feedback.dto';
import IsAuthorized from 'src/guards/isAuthorized';
import { Request } from 'express';
import decodeJwt from 'src/utils/decodeJwt';

@Controller('/feedback')
export default class FeedbackController {
  constructor(private service: FeedbackService) {}

  @Post()
  @UseGuards(new IsAuthorized())
  async create(@Req() req: Request, @Body() feedback: CreateFeedbackDto) {
    try {
      return await this.service.create(decodeJwt(req) as any, feedback);
    } catch (error) {
      throw new ConflictException({
        message: 'You already rated this product',
      });
    }
  }
}
