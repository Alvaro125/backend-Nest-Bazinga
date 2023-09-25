import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';
import { ApiProperty } from '@nestjs/swagger';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  id_creator: User;
  @ApiProperty()
  @Prop()
  img: string;

  @ApiProperty()
  @Prop({ required: true })
  content: string;

  @ApiProperty()
  @Prop({ type: Date, default: Date.now() })
  create_at: Date;

  @ApiProperty()
  @Prop({
    type: [
      {
        id_creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        content: { type: String },
        create_at: { type: Date, default: Date.now },
      },
    ],
  })
  comments: { id_creator: User; content: string; create_at: Date }[];
  @ApiProperty()
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  likes: User[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
