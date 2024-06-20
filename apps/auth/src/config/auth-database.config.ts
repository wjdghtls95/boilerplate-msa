import { registerAs } from '@nestjs/config';
import baseDatabaseConfig from './base-database.config';

export default registerAs('auth-database', () => ({
  ...baseDatabaseConfig,

  type: process.env.AUTH_DB_TYPE,
  host: process.env.AUTH_DB_HOST,
  port: Number(process.env.AUTH_DB_PORT),
  username: process.env.AUTH_DB_USER,
  password: process.env.AUTH_DB_PASSWORD,
  name: process.env.AUTH_DB_NAME,
  database: process.env.AUTH_DB_DATABASE,
  synchronize: true,
  entities: ['dist/apps/auth/src/modules/**/*.entity.!(js.map){,+(ts,js)}'],
}));
