import { Controller, Get } from '@nestjs/common';
import { ApiResponseEntity } from '@libs/common/decorators/api-response-entity.decorator';
import { ResponseEntity } from '@libs/common/networks/response-entity';

@Controller()
export class DefaultController {
  @Get()
  @ApiResponseEntity({ summary: 'health check' })
  healthCheck(): ResponseEntity<unknown> {
    return ResponseEntity.ok().build();
  }
}
