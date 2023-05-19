import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
import { compareSync, hashSync } from 'bcrypt';
import { sign } from 'crypto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private userRepository : Repository<Admin>,
    private jwtService : JwtService
  ) {}

  async signUp(createAdminDto : CreateAdminDto) {
    const password = hashSync(createAdminDto.password, 10)
    let signData = await  this.userRepository.create({...createAdminDto, password})
    signData = await this.userRepository.save(signData)
    return signData
  }

  async login(createAdminDto : CreateAdminDto) {
    const data = await this.userRepository.findOneBy({email : createAdminDto.email})
    const password = compareSync(createAdminDto.password, data.password)
    if(password == false) {
      throw new UnauthorizedException('enter valid password')
    }
    const payload = {
      id : data.id,
      email : data.email
    }
    const token = await this.jwtService.signAsync(payload, { secret : process.env.JWT_SECRET, expiresIn : '8d'})
    await this.userRepository.update({id : data.id},{token : token})
   return {
    message : 'login successfully',
    token : token
   }

  }

  async logout(id : string) {
    const findAdmin = await this.userRepository.findOneBy({id : id})
    if(!findAdmin) {
      throw new UnauthorizedException('Invalid Admin')
    }
    await this.userRepository.update({id : id},{token : null})
    return {
      message : 'Logout successfully'
    }
  }

  async findAdmin(id : string) {
    const data = await this.userRepository.findOneBy({id : id})
    return data
  }
}
