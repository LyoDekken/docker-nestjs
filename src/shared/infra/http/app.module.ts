import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from 'src/modules/admin/infra/admin.module';
import { AuthModule } from 'src/modules/auth/infra/auth.module';
import { UserModule } from 'src/modules/user/infra/user.module';
import { PrismaModule } from '../prisma/prisma.module';
import { AppService } from '../services/app.service';
import { AppController } from './controllers/app.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    AuthModule,
    UserModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
