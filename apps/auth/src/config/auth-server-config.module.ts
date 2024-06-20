import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import authDatabaseConfig from './auth-database.config';

const environment = process.env.NODE_ENV || 'test';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./config/.auth.${environment}.env`,
      isGlobal: true,
      cache: true,
      load: [authDatabaseConfig],
    }),
  ],
})
export class AuthServerConfigModule {}
