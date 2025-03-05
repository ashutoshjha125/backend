import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { PostsService } from './posts.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  async getAllPosts() {
    return this.postsService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createPost(@Body() createPostDto, @Request() req) {
    return this.postsService.create(createPostDto, req.user);
  }
}
