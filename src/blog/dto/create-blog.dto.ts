import { IsNotEmpty, IsOptional } from "class-validator";
import { Category } from "src/category/entities/category.entity";

export class CreateBlogDto {

    @IsNotEmpty()
    title : string

    @IsOptional()
    slug : string

    @IsOptional()
    blogImage : string

    @IsOptional()
    description : string

    @IsOptional()
    publish_date : Date

    category  : Category
}
