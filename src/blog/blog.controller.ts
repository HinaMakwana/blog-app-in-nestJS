import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import slugify from 'slugify';
import { JwtAuthguard } from 'src/admin/guard/jwt-auth/jwt-auth.guard';

@UseGuards(JwtAuthguard)
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @UseInterceptors(FileInterceptor('blogImage',{
    storage : diskStorage({
      destination : './files',
      filename : (req,file,cb) => {
          const filename = file.originalname
          cb(null,filename)
      }
  }),
  }))
  @Post()
  create(@Body() createBlogDto: CreateBlogDto, @UploadedFile() photo : Express.Multer.File) {
    createBlogDto.publish_date = new Date()
    createBlogDto.slug = slugify(createBlogDto.title)
    createBlogDto.blogImage = photo.path
    return this.blogService.create(createBlogDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(id, updateBlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }
}
