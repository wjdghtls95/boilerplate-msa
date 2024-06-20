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

if (!configService.get('LOG_DB_HOST')) {
  throw Error('Not Exist Config');
}

export default new DataSource({
  type: 'mysql',
  namingStrategy: new SnakeNamingStrategy(),
  charset: 'utf8mb4',
  timezone: 'Z',
  host: configService.get('LOG_DB_HOST'),
  port: configService.get('LOG_DB_PORT'),
  username: configService.get('LOG_DB_USER'),
  password: configService.get('LOG_DB_PASSWORD'),
  database: configService.get('LOG_DB_DATABASE'),
  synchronize: false,
  entities: ['./libs/dao/src/**/*.entity.ts'],
  migrationsRun: false,
  migrations: ['./libs/common/src/databases/typeorm/migrations/log/*.ts'],
  migrationsTableName: 'migrations',
});
