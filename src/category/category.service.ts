import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepository : Repository<Category>,
    @InjectDataSource() private datasource : DataSource
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const findCategory = await this.categoryRepository.findOneBy({name : createCategoryDto.name})
    if (findCategory) {
      throw new ConflictException({
        error : 'category name is available',
        message : 'enter unique name'
      })
    }
    let data = await this.categoryRepository.create(createCategoryDto)
     await this.categoryRepository.save(data)
    return data
  }
  async deleteCategory(id : string) {
    const findCategory = await this.categoryRepository.findOneBy({id : id})
    if (!findCategory) {
      throw new NotFoundException({
        message : 'Category not found'
      })
    }
    await this.categoryRepository.delete(id)
    return {
      message : 'category deleted successfully'
    }
  }
  async updateCategory(id : string, updateCategoryDto : UpdateCategoryDto) {
    console.log(id);
    const query = `UPDATE category set name = '${updateCategoryDto.name}' where id = '${id}'`
    const data = await this.datasource.query(query)
    return {
      message : 'category updated'
    }
    /* const findCategory = await this.categoryRepository.findOneBy({id : id})
    if (!findCategory) {
      throw new NotFoundException({
        message : 'Category not found'
      })
    }
    await this.categoryRepository.update(id,updateCategoryDto) */
  }
  async getAll() {
    const allCategory = await this.categoryRepository.find()
    return allCategory
  }

}
