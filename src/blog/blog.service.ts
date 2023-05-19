import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { DataSource, Repository } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog) private blogRepository : Repository<Blog>,
    @InjectDataSource() private dataSource : DataSource
  ) {}
  async create(createBlogDto: CreateBlogDto) {
    let data = await this.blogRepository.create({
      ...createBlogDto,
      category : createBlogDto.category as Category
    })
    data = await this.blogRepository.save(data)
    return data
  }

  async update(id: string, updateBlogDto: UpdateBlogDto) {
    console.log(updateBlogDto);
    let data = await this.blogRepository.update(id, updateBlogDto)
    return data;
  }

  async remove(id: string) {
    await this.blogRepository.delete(id)
    return {
      message : 'blog deleted'
    }
  }

  async listAll() {
    const data = await this.blogRepository.find()
    return data
  }
  async getOne(id:string) {
    const getOne = await this.blogRepository.findOneBy({id : id})
    if(getOne == null) {
      throw new NotFoundException({
        message : 'No blog found'
      })
    }
    console.log(getOne);
    return getOne
  }
  async searchBlog(slug: string) {
    const query = `SELECT * FROM blog WHERE slug LIKE '%${slug}%'`
    const blog = await this.dataSource.query(query)
    return blog
  }
}
