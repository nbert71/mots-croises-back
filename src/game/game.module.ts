import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { Game } from './entities/game.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenerateGame } from './GenerateGame'
import { User } from '../user/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Game]), TypeOrmModule.forFeature([User])],
    controllers: [GameController],
    providers: [GameService, GenerateGame]
})
export class GameModule { }
