import { Module } from '@nestjs/common';
import { ClientController } from './client/client.controller';

@Module({
  controllers: [ClientController],
  exports: [],
})
export class ControllerModule {}
