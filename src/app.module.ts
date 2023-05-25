import { Module } from '@nestjs/common';
import { ClientController } from './controller/client/client.controller';
import { ClientService } from './service/client/client.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientSchema } from './schemas/client.schema';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/client_abm'),
    MongooseModule.forFeature([{ name: 'Client', schema: ClientSchema }]),
  ],
  controllers: [ClientController],
  providers: [ClientService],
})
export class AppModule {}
