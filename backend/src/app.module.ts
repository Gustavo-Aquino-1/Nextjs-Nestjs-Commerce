import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import OrderModule from './order/order.module';
import FeedbackModule from './feedback/feedback.module';

@Module({
  imports: [AuthModule, ProductModule, OrderModule, FeedbackModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
