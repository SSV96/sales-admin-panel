import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { PostgresType } from 'src/config';

export const getPostgresConfig = (
  configService: ConfigService,
): SequelizeModuleOptions => {
  const { host, username, password, dbName, port } =
    configService.get<PostgresType>('db.postgres', { infer: true });

  const NODE_ENV = configService.get<string>('app.env', { infer: true });

  return {
    dialect: 'postgres',
    host,
    port,
    username,
    password,
    database: dbName,
    autoLoadModels: true,
    synchronize: NODE_ENV === 'local' || NODE_ENV === 'development',
    dialectOptions:
      NODE_ENV === 'production'
        ? {
            ssl: {
              require: true,
              rejectUnauthorized: false,
            },
          }
        : {},
    logging: NODE_ENV !== 'production',
  };
};
