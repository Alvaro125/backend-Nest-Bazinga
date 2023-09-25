import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Post } from 'src/schemas/post.schema';
import { PostDto } from 'src/dto/postDTO';
import { CommnetDto } from 'src/dto/commentDTO';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    private jwtService: JwtService,
  ) {}
  async create({ content, url }: PostDto, idUser: string) {
    const createdUser = new this.postModel({
      content,
      img: url,
      id_creator: idUser,
    });
    return createdUser.save();
  }
  async addComment(id: number, { content }: CommnetDto, idUser: string) {
    return this.postModel.findOneAndUpdate(
      { _id: id },
      { $push: { comments: { id_creator: idUser, content: content } } },
    );
  }

  async getAll() {
    return this.postModel
      .find()
      .populate('id_creator comments.id_creator', 'name nick avatar')
      .exec();
  }
}
