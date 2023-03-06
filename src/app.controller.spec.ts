import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Game } from './game/entities/game.entity';
import { GameModule } from './game/game.module';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';

describe('AppController', () => {
    let appController: AppController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [AppService],
            imports: [
                ConfigModule.forRoot(),
                TypeOrmModule.forRoot({
                    type: 'postgres',
                    host: 'localhost',
                    port: parseInt(process.env.POSTGRES_PORT),
                    username: process.env.POSTGRES_USER,
                    password: process.env.POSTGRES_PASSWORD,
                    database: process.env.TEST_POSTGRES_DB,
                    entities: [User, Game],
                    synchronize: true,
                }),
                UserModule,
                GameModule,
                AuthModule,
            ],
        }).compile();

        appController = app.get<AppController>(AppController);
    });

    describe('root', () => {
        it('should return "Hello World!"', () => {
            expect(appController.getHello()).toBe('Hello World!');
        });
    });
});
