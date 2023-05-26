import { Module } from '@nestjs/common';
import { ClientController } from './client/client.controller';
import { ServiceModule } from '../service/service.module';
import { SaleController } from './sale/sale.controller';

@Module({
  controllers: [ClientController, SaleController],
  imports: [ServiceModule],
})
export class ControllerModule {}
