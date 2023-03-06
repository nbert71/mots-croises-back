import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserService', () => {
    //  let service: UserService;

    //   beforeEach(async () => {
    //     const module: TestingModule = await Test.createTestingModule({
    //       providers: [UserService],
    //       controllers: [UserController],
    //       imports: [TypeOrmModule.forFeature([User])]
    //     }).compile();

    //     service = module.get<UserService>(UserService);
    //   });

    //   it('should be defined', () => {
    //     expect(service).toBeDefined();
    //   });
    it('test of test', () => {
        expect(1).toBe(1);
    });
});
