import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { BlogService } from 'src/blog/blog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from 'src/blog/entities/blog.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Blog])
  ],
  controllers: [UserController],
  providers: [UserService,BlogService]
})
export class UserModule {}
