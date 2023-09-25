import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';
export type ImageDocument = HydratedDocument<Image>;

@Schema()
export class Image {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  id_creator: User;
  @Prop()
  url: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
