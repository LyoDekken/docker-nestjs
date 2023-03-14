import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/shared/infra/prisma/prisma.module';
import { ResetPasswordService } from '../services/reset-password.service';
import { ResetPasswordController } from './http/controllers/reset-password.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ResetPasswordController],
  providers: [ResetPasswordService],
})
export class ResetPasswordModule {}
