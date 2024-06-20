import { AuthServerConfigModule } from './config/auth-server-config.module';
import { Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import authDatabaseConfig from './config/auth-database.config';
import { DefaultModule } from './modules/default/default.module';
import { TypeOrmExModule } from '@libs/common/databases/typeorm/typeorm-ex.module';

@Module({
  imports: [
    // config
    AuthServerConfigModule,

    // cls
    ClsModule.forRoot({ global: true, middleware: { mount: true } }),

    // auth database (rdbms)
    TypeOrmExModule.forRootAsync({
      name: authDatabaseConfig().name,
      inject: [authDatabaseConfig.KEY],
      useFactory: async (config) => config,
    }),

    // health check
    DefaultModule,
  ],
  providers: [],
})
export class AuthModule {}
