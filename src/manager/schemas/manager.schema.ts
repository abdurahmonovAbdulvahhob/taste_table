import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Restoran } from "../../restoran/schemas/restoran.schema";

export type ManagerDocument = HydratedDocument<Manager>;

@Schema({ versionKey: false })
export class Manager {
  @Prop()
  full_name: string;

  @Prop()
  email: string;

  @Prop()
  hashed_password: string;

  @Prop()
  tg_link: string;

  @Prop()
  is_active: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Restoran" })
  restoran_id: Restoran;
}

export const ManagerSchema = SchemaFactory.createForClass(Manager);
