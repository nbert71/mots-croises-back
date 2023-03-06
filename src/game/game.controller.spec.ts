import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { GenerateGame } from './GenerateGame';

describe('GameController', () => {
    //   let controller: GameController;

    //   beforeEach(async () => {
    //     const module: TestingModule = await Test.createTestingModule({
    //       controllers: [GameController],
    //       providers: [GameService, GenerateGame],
    //     }).compile();

    //     controller = module.get<GameController>(GameController);
    //   });

    //   it('should be defined', () => {
    //     expect(controller).toBeDefined();
    //   });
    it('test of test', () => {
        expect(1).toBe(1);
    });
});
