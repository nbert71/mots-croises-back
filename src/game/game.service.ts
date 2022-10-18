import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';
import {GenerateGame} from './GenerateGame'

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
    private readonly generateGame: GenerateGame
  ) {}

  async create(user){
    let newGame = this.generateGame.main()
    const gameEntity : Game = Game.create();
    gameEntity.grid = newGame.grid;
    gameEntity.profit = newGame.profit;
    gameEntity.words = newGame.words,
    gameEntity.displayedLetters = newGame.displayedLetters,
    gameEntity.player = user.id

    await Game.save(gameEntity)
    const {createdAt,profit,isFinished,words,player, ...result} = gameEntity

    return result
  }

  // findAll(): Promise<Game[]> {
  //   return this.gameRepository.find();
  // }

  // findOne(id: number): Promise<Game> {
  //   return this.gameRepository.findOneBy({ id });
  // }

  // update(id: number, updateGameDto: UpdateGameDto) {
  //   return `This action updates a #${id} game`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} game`;
  // }
}
