import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';
import { GenerateGame } from './GenerateGame';
import { BetterLogger } from 'src/logger/logger';

@Injectable()
export class GameService {
    constructor(
        @InjectRepository(Game)
        private gameRepository: Repository<Game>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private readonly generateGame: GenerateGame,
    ) { }

    private readonly logger = new BetterLogger(GameService.name)

    async create(user) {
        const lastGame = await this.gameRepository.findOne({
            where: {
                player: user,
                isFinished: false,
            },
        });

        const userEntity = await this.userRepository.findOne({
            where: {
                id: user.id,
            },
        });

        if (lastGame) {
            const { createdAt, profit, isFinished, words, player, ...result } =
                lastGame;
            this.logger.log(`[${user.username}] reuse non finished game`)
            return { ...result, money: userEntity.money };
        } else if (userEntity.money < 3) {
            this.logger.error(`[${user.username}] Not enough money`)
            return null;
        } else {
            userEntity.money -= 3;
            userEntity.save();

            const newGame = await this.generateGame.main();
            const gameEntity: Game = Game.create();
            gameEntity.grid = newGame.grid;
            gameEntity.profit = newGame.profit;
            (gameEntity.words = newGame.words),
                (gameEntity.displayedLetters = newGame.displayedLetters),
                (gameEntity.player = user.id);

            await Game.save(gameEntity);

            const { createdAt, profit, isFinished, words, player, ...result } =
                gameEntity;
            this.logger.log(`[${user.username}] Create new game`)
            return { ...result, money: userEntity.money };
        }
    }

    async findAllByUser(user) {
        return this.gameRepository.find({
            where: {
                player: user,
            },
        });
    }

    async endGame(user) {
        const lastGame = await this.gameRepository.findOne({
            where: {
                player: user,
                isFinished: false,
            },
        });

        const userEntity = await this.userRepository.findOne({
            where: {
                id: user.id,
            },
        });

        if (lastGame) {
            lastGame.isFinished = true;
            lastGame.save();
            userEntity.money += lastGame.profit;
            userEntity.save();
            this.logger.log(`[${user.username}] finish game`)
        } else {
            this.logger.error(`[${user.username}] try to finish non existing game`)
        }
        return userEntity.money;
    }
}
