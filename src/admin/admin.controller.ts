import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { JwtAuthguard } from './guard/jwt-auth/jwt-auth.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  signUp(@Body() createAdminDto : CreateAdminDto) {
    return this.adminService.signUp(createAdminDto)
  }

  @Post('login')
  login(@Body() createAdminDto : CreateAdminDto) {
    return this.adminService.login(createAdminDto)
  }

  @UseGuards(JwtAuthguard)
  @Post('logout')
  logout(@Req() req) {
    const id = req.user.id
    return this.adminService.logout(id)
  }
}
