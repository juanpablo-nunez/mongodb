import { Module } from '@nestjs/common';
import { ClientService } from './client/client.service';
import { SaleService } from './sale/sale.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientSchema } from '../persistance/client.schema';
import { SaleSchema } from '../persistance/sale.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Client', schema: ClientSchema },
      { name: 'Sale', schema: SaleSchema },
    ]),
  ],
  providers: [ClientService, SaleService],
  exports: [ClientService, SaleService],
})
export class ServiceModule {}
