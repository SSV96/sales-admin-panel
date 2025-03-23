import config from '../../config';
import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
@Module({
  imports: [
    NestConfigModule.forRoot({
      validate: config,
      isGlobal: true,
    }),
  ],
})
export class ConfigModule {}
