import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceModule } from './service/service.module';
import { ControllerModule } from './controller/controller.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/client_abm'),
    ServiceModule,
    ControllerModule,
  ],
})
export class AppModule {}
