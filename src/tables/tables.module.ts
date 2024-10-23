import { Module } from "@nestjs/common";
import { TablesService } from "./tables.service";
import { TablesController } from "./tables.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Tables, TablesSchema } from "./schemas/table.schema";
import { RestoranModule } from "../restoran/restoran.module";
import { Restoran, RestoranSchema } from "../restoran/schemas/restoran.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Tables.name,
        schema: TablesSchema,
      },
      {
        name: Restoran.name,
        schema: RestoranSchema,
      },
    ]),
  ],
  controllers: [TablesController],
  providers: [TablesService],
})
export class TablesModule {}
