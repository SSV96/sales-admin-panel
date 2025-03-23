import { Global, Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { PostgresModule } from './postgres/postgres.module';

@Global()
@Module({
  imports: [ConfigModule, PostgresModule],
  exports: [ConfigModule, PostgresModule],
})
export class CommonModule {}
