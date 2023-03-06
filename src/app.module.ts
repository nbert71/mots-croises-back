import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { GameModule } from './game/game.module';
import { Game } from './game/entities/game.entity';
import { AuthModule } from './auth/auth.module';


@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: parseInt(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            entities: [User, Game],
            synchronize: true,
        }),
        UserModule,
        GameModule,
        AuthModule
    ],
    controllers: [AppController],
    providers: [AppService],
})

export class AppModule { }
