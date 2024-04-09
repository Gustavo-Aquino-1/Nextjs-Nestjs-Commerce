import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import OrderModule from './order/order.module';
import FeedbackModule from './feedback/feedback.module';
import RecoverPasswordModule from './recoverPassword/recover.password.module';

@Module({
  imports: [
    AuthModule,
    ProductModule,
    OrderModule,
    FeedbackModule,
    RecoverPasswordModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
