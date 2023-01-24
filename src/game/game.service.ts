import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
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
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly generateGame: GenerateGame
  ) {}

  async create(user){
    const lastGame = await this.gameRepository.findOne({
      where:{
        player: user,
        isFinished:false
      }
    })

    const userEntity = await this.userRepository.findOne({
      where:{
        id:user.id
      }
    })


    if(lastGame){
      const {createdAt,profit,isFinished,words,player, ...result} = lastGame;
      return {...result, money:userEntity.money}
    }else if(userEntity.money<3){
        return null
    }else{
      userEntity.money-=3;
      userEntity.save();

      let newGame = await this.generateGame.main()
      const gameEntity : Game = Game.create();
      gameEntity.grid = newGame.grid;
      gameEntity.profit = newGame.profit;
      gameEntity.words = newGame.words,
      gameEntity.displayedLetters = newGame.displayedLetters,
      gameEntity.player = user.id

      await Game.save(gameEntity)
      
      const {createdAt,profit,isFinished,words,player, ...result} = gameEntity;
      return {...result, money:userEntity.money}
    }
  }

  async findAllByUser(user){
    return this.gameRepository.find({
      where: {
        player: user
      }
    })
  }

  async endGame(user){
    const lastGame = await this.gameRepository.findOne({
      where:{
        player: user,
        isFinished:false
      }
    })

    const userEntity = await this.userRepository.findOne({
      where:{
        id:user.id
      }
    })

    if(lastGame){
      lastGame.isFinished=true;
      lastGame.save()
      userEntity.money+=lastGame.profit;
      userEntity.save()
    }
    return userEntity.money
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
