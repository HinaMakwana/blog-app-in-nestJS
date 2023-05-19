import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import supertest from "supertest";
import { Admin, Repository } from "typeorm";
import { AdminService } from "../admin.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly adminService : AdminService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        })
    }

    async validate(payload:any) {
        const data = await this.adminService.findAdmin(payload.id)
        if(data.token === null) {
            throw new UnauthorizedException({
                error : 'Invalid Token'
            })
        }
        return payload;
    }
}