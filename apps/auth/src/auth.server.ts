import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SWAGGER_CUSTOM_OPTIONS } from '@libs/common/constants/swagger.constants.';

export class AuthServer {
  constructor(private readonly app: INestApplication) {}

  /**
   * 서버 초기화
   */
  init(): void {
    // swagger 초기화
    this._initializeAuthSwagger();
  }

  /**
   * 서버 실행
   */
  async run(): Promise<void> {
    Logger.log('Auth Server is running on port ' + process.env.SERVER_PORT);
    await this.app.listen(process.env.SERVER_PORT, '0.0.0.0');
  }

  /**
   * OPEN API(Swagger) 초기화 - AuthServer
   */
  private _initializeAuthSwagger(): void {
    if (!['prod', 'staging'].includes(process.env.NODE_ENV)) {
      const config = new DocumentBuilder()
        .setTitle('Boilerplate MSA Project')
        .setDescription('The Boilerplate MSA Project description')
        .setVersion('1.0')
        .build();

      const document = SwaggerModule.createDocument(this.app, config);

      SwaggerModule.setup(
        '/auth/api-docs',
        this.app,
        document,
        SWAGGER_CUSTOM_OPTIONS,
      );
    }
  }
}
