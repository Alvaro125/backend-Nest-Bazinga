import { Controller, Post, Body, Req, Get, Param } from '@nestjs/common';
import { Request } from 'express';
import { CommnetDto } from 'src/dto/commentDTO';
import { PostDto } from 'src/dto/postDTO';
import { PostService } from 'src/service/post.service';

@Controller('api/posts')
export class PostsController {
  constructor(private postService: PostService) {}

  @Post()
  create(@Body() postDto: PostDto, @Req() req: Request) {
    return this.postService.create(postDto, req['user']['sub']);
  }
  @Post(':id/comment')
  addComment(
    @Param('id') id: number,
    @Body() commentDto: CommnetDto,
    @Req() req: Request,
  ) {
    return this.postService.addComment(id, commentDto, req['user']['sub']);
  }

  @Get()
  getAll() {
    return this.postService.getAll();
  }
}
