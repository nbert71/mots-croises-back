import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';


@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('refill')
    async updateSolde(@Request() req) {
        const oldSolde = req.body.solde;
        const refill = req.body.refill;
        let newSolde = await this.userService.updateSolde(req.user.id, oldSolde, refill)
        return newSolde;
    }

}
