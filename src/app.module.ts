import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [CommonModule, CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
