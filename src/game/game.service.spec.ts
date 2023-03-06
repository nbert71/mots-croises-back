import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { GenerateGame } from './GenerateGame';

describe('GameService', () => {
    //   let service: GameService;

    //   beforeEach(async () => {
    //     const module: TestingModule = await Test.createTestingModule({
    //       providers: [GameService, GenerateGame],
    //       controllers: [GameController]
    //     }).compile();

    //     service = module.get<GameService>(GameService);
    //   });

    //   it('should be defined', () => {
    //     expect(service).toBeDefined();
    //   });
    it('test of test', () => {
        expect(1).toBe(1);
    });
});
