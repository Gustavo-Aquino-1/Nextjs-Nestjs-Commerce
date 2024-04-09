import { Module } from '@nestjs/common';
import RecoverPasswordController from './recover.password.controller';
import RecoverPasswordService from './recover.password.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'guaquino.dev@gmail.com',
          pass: 'dhpc cxyr qaed elld ',
        },
      },
    }),
  ],
  controllers: [RecoverPasswordController],
  providers: [RecoverPasswordService],
})
export default class RecoverPasswordModule {}
