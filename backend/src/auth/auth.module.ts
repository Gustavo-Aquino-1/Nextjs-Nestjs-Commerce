import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';

const { JWT_SECRET_ACESS_TOKEN, JWT_EXPIRES_ACESS_TOKEN } = process.env;

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: JWT_SECRET_ACESS_TOKEN,
      signOptions: { expiresIn: JWT_EXPIRES_ACESS_TOKEN },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
