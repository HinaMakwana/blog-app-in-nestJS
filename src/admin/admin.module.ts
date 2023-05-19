import { Module, forwardRef } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    JwtModule.register({
      global : true,
      secret : process.env.JWT_SECRET,
      signOptions : { expiresIn : '60s' }
    }),
  ],
  controllers: [AdminController],
  providers: [AdminService,JwtService, JwtStrategy],
})
export class AdminModule {}
