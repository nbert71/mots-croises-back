import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

describe('AuthService', () => {
    //   let service: AuthService;

    //   beforeEach(async () => {
    //     const module: TestingModule = await Test.createTestingModule({
    //       providers: [AuthService, LocalStrategy, JwtStrategy],
    //     }).compile();

    //     service = module.get<AuthService>(AuthService);
    //   });

    //   it('should be defined', () => {
    //     expect(service).toBeDefined();
    //   });
    it('test of test', () => {
        expect(1).toBe(1);
    });
});
