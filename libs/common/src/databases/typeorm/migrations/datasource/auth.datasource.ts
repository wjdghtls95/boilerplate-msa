import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import dotenv = require('dotenv');
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const environment = process.env.NODE_ENV;

dotenv.config();
dotenv.config({
  path: `./config/.auth.${environment}.env`,
});

const configService = new ConfigService();

if (!configService.get('AUTH_DB_HOST')) {
  throw Error('Not Exist Config');
}

export default new DataSource({
  type: 'mysql',
  namingStrategy: new SnakeNamingStrategy(),
  charset: 'utf8mb4',
  timezone: 'Z',
  host: configService.get('AUTH_DB_HOST'),
  port: configService.get('AUTH_DB_PORT'),
  username: configService.get('AUTH_DB_USER'),
  password: configService.get('AUTH_DB_PASSWORD'),
  database: configService.get('AUTH_DB_DATABASE'),
  synchronize: false,
  entities: ['./apps/auth/src/**/*.entity.ts'],
  migrationsRun: false,
  migrations: ['./libs/common/src/databases/typeorm/migrations/auth/*.ts'],
  migrationsTableName: 'migrations',
});
