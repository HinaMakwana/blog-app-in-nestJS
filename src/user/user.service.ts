import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BlogService } from 'src/blog/blog.service';

@Injectable()
export class UserService {
  constructor(
    private blogService : BlogService
    ) {}

  listAllBlog() {
    const allBlog = this.blogService.listAll()
    return allBlog
  }
  getOneBlog(id : string) {
    const oneBlog = this.blogService.getOne(id)
    return oneBlog
  }

  searchBlog(slug : string) {
    const data = this.blogService.searchBlog(slug)
    return data
  }
}
