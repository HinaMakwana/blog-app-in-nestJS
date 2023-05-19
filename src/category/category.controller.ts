import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthguard } from 'src/admin/guard/jwt-auth/jwt-auth.guard';

@UseGuards(JwtAuthguard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Delete(':id')
  deleteCategory(@Param('id') id : string) {
    return this.categoryService.deleteCategory(id)
  }

  @Patch(':id')
  updateCategory(@Body() updateCategoryDto : UpdateCategoryDto, @Param('id') id: string) {
    return this.categoryService.updateCategory(id,updateCategoryDto)
  }

  @Get()
  getAll() {
    return this.categoryService.getAll()
  }


}
