import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { AuthServer } from './auth.server';

async function authServer(): Promise<void> {
  const app = await NestFactory.create(AuthModule);

  const authServer = new AuthServer(app);
  authServer.init();
  await authServer.run();
}
void authServer();
