import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Tables } from "../../tables/schemas/table.schema";
import { Restoran } from "../../restoran/schemas/restoran.schema";
import { Category } from "../../category/schemas/category.schema";
import { Language } from "../../language/schemas/language.schema";

export type MenuDocument = HydratedDocument<Menu>;

@Schema({ versionKey: false })
export class Menu {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  image: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Language" })
  language_id: Language;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Category" })
  category_id: Category;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Restoran" }] })
  restoran_id: Restoran;
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
