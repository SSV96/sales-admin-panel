import { ConfigValidationSchema } from './config.validation';

const config = (config: Record<string, unknown>) => {
  const ENVS = ConfigValidationSchema.parse(config);
  const APP_NAME = 'SalesAdminPanel';
  const NODE_ENV = ENVS.NODE_ENV;
  const PORT = ENVS.PORT;

  return {
    app: {
      appName: APP_NAME,
      env: NODE_ENV,
      port: PORT,
    },
    db: {
      postgres: {
        host: ENVS.PG_HOST,
        dbName: ENVS.PG_DATABASE,
        username: ENVS.PG_USER,
        password: ENVS.PG_PASSWORD,
        port: ENVS.PG_PORT,
      },
    },
  } as const;
};

export type ConfigVariablesType = ReturnType<typeof config>;

export type PostgresType = ConfigVariablesType['db']['postgres'];

export default config;
