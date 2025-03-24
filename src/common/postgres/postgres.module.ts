import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { PostgresType } from 'src/config';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const { host, username, password, dbName, port } =
          configService.get<PostgresType>('db.postgres');

        return {
          dialect: 'postgres',
          host,
          port,
          username,
          password,
          database: dbName,
          autoLoadModels: true,
          synchronize: true,
        };
      },
    }),
  ],
})
export class PostgresModule {}
