import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Admin } from './admin/entities/admin.entity';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';
import { BlogModule } from './blog/blog.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AdminModule,
    ConfigModule.forRoot(),
    // TypeOrmModule.forRootAsync({
    //   useFactory: () => ({
    //     type: 'mysql',
    //     host: process.env.DB_HOST,
    //     port: parseInt(process.env.DB_PORT) || 3306,
    //     username: process.env.DB_USERNAME,
    //     password: process.env.DB_PASSWORD,
    //     database: process.env.DB_DATABASE,
    //     // entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //     autoLoadEntities: true,
    //     synchronize: false
    //   })
    // }),
    TypeOrmModule.forRoot({
      type : 'mysql',
      host : process.env.DB_HOST,
      port : Number(process.env.DB_PORT),
      username : process.env.DB_USERNAME,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_DATABASE,
      // entities: [__dirname + '/../**/*.entity.js'],
      // entities : [Admin],
      autoLoadEntities: true,
      synchronize : true,
    }),
    CategoryModule,
    BlogModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
