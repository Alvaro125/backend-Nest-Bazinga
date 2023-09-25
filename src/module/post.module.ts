import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsController } from 'src/controller/post.controller';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';
import { Post, PostSchema } from 'src/schemas/post.schema';
import { PostService } from 'src/service/post.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  controllers: [PostsController],
  providers: [PostService],
})
export class PostsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(PostsController);
  }
}
