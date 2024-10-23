import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Manager, ManagerSchema } from './schemas/manager.schema';
import { Restoran, RestoranSchema } from '../restoran/schemas/restoran.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Manager.name,
        schema: ManagerSchema,
      },
      {
        name: Restoran.name,
        schema: RestoranSchema,
      },
    ]),
  ],
  controllers: [ManagerController],
  providers: [ManagerService],
})
export class ManagerModule {}
