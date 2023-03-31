import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Request,
    UseGuards,
    Logger,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
    constructor(private readonly userService: UserService) { }
    private readonly logger = new Logger(UserController.name)

    @Post('refill')
    async updateSolde(@Request() req) {
        const oldSolde = req.body.solde;
        const refill = req.body.refill;
        const newSolde = await this.userService.updateSolde(
            req.user.id,
            oldSolde,
            refill,
        );
        this.logger.log(`${req.user.username} update money from ${oldSolde}€ to ${newSolde}€`)
        return newSolde;
    }
}
