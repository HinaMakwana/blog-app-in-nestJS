import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ReturnDocument } from 'typeorm';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  seeAllBlog() {
    return this.userService.listAllBlog()
  }

  @Get(':id')
  getOne(@Param('id') id:string) {
    return this.userService.getOneBlog(id)
  }

  @Get('search/:slug')
  searchBlog(@Param('slug') slug : string) {
    return this.userService.searchBlog(slug)
  }
}
