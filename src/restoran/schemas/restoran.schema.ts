import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Tables } from "../../tables/schemas/table.schema";
import { Category } from "../../category/schemas/category.schema";
import { Menu } from "../../menu/schemas/menu.schema";
import { Manager } from "../../manager/schemas/manager.schema";

export type RestoranDocument = HydratedDocument<Restoran>;

@Schema({ versionKey: false })
export class Restoran {
  @Prop()
  name: string;

  @Prop()
  phone_number: string;

  @Prop()
  description: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tables" }] })
  tables: Tables[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Manager" }] })
  managers: Manager[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }] })
  categories: Category[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Menu" }] })
  menus: Menu[];
}

export const RestoranSchema = SchemaFactory.createForClass(Restoran);
