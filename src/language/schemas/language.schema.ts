import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Tables } from "../../tables/schemas/table.schema";
import { Restoran } from "../../restoran/schemas/restoran.schema";
import { Category } from "../../category/schemas/category.schema";
import { Menu } from "../../menu/schemas/menu.schema";

export type LanguageDocument = HydratedDocument<Language>;

@Schema({ versionKey: false })
export class Language {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Restoran" }] })
  restorans: Restoran[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }] })
  categories: Category[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Menu" }] })
  menus: Menu[];
}

export const LanguageSchema = SchemaFactory.createForClass(Language);
