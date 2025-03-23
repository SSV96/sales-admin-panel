import * as z from 'zod';

export const ConfigValidationSchema = z.object({
  NODE_ENV: z.enum(['development', 'local', 'production', 'test']),
  PORT: z.string(),

  // Postgres
  PG_HOST: z.string(),
  PG_DATABASE: z.string(),
  PG_USER: z.string(),
  PG_PASSWORD: z.string(),
  PG_PORT: z.coerce.number(),
});
