import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Tables } from "../../tables/schemas/table.schema";
import { Restoran } from "../../restoran/schemas/restoran.schema";
import { Language } from "../../language/schemas/language.schema";

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ versionKey: false })
export class Category {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Language" })
  language_id: Language;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Restoran" }] })
  restoran_id: Restoran;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
