import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Request,
} from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('game')
export class GameController {
    constructor(private readonly gameService: GameService) { }

    @Get('new')
    @UseGuards(JwtAuthGuard)
    async newGame(@Request() req) {
        return await this.gameService.create(req.user);
    }

    @Get('end')
    @UseGuards(JwtAuthGuard)
    async endGame(@Request() req) {
        return await this.gameService.endGame(req.user);
    }

    @Get('/history')
    @UseGuards(JwtAuthGuard)
    async lastFiveGames(@Request() req) {
        return await this.gameService.findAllByUser(req.user);
    }
}
