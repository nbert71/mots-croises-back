import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('game')
export class GameController {
  constructor(
      private readonly gameService: GameService
    ) {}

  @Get('new')
  @UseGuards(JwtAuthGuard)
  async newGame(@Request() req){
    return await this.gameService.create(req.user)
  }

  @Get('/history')
  @UseGuards(JwtAuthGuard)
  async lastFiveGames(@Request() req){
    return await this.gameService.findAllByUser(req.user)
  }

  // @Get()
  // findAll() {
  //   return this.gameService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.gameService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
  //   return this.gameService.update(+id, updateGameDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.gameService.remove(+id);
  // }
}
