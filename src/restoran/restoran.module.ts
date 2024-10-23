import { Module } from '@nestjs/common';
import { RestoranService } from './restoran.service';
import { RestoranController } from './restoran.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Restoran, RestoranSchema } from './schemas/restoran.schema';

@Module({
  imports: [MongooseModule.forFeature([{
    name: Restoran.name,
    schema: RestoranSchema
  }])],
  exports: [RestoranService],
  controllers: [RestoranController],
  providers: [RestoranService],
})
export class RestoranModule {}
