import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { BetterLogger } from 'src/logger/logger';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    private readonly logger = new BetterLogger(UserService.name);

    async findOne(id: number): Promise<any> {
        const data = await this.userRepository.findOneBy({ id });
        const { password, ...user } = data;
        this.logger.log(`findOne: ${user.username}`)
        return user;
    }

    findOneByUsername(username: string): Promise<User> {
        // TODO:  penser à enlever les password dans le return
        return this.userRepository.findOneBy({ username });
    }

    async create(user: CreateUserDto): Promise<any> {
        const userEntity: User = User.create();
        userEntity.firstName = user.firstName;
        userEntity.lastName = user.lastName;
        userEntity.username = user.username;

        const hash = await bcrypt.hash(user.password, 10);
        userEntity.password = hash;

        await User.save(userEntity);
        const { password, ...result } = userEntity;
        this.logger.log(`create: ${result.username}`)
        return result;
    }

    async updateSolde(
        id: number,
        oldSolde: number,
        refill: number,
    ): Promise<any> {
        const user: User = await this.userRepository.findOneBy({ id });
        if (user.money == oldSolde) {
            user.money += refill;
            user.save();
            this.logger.log(`updateSolde: ${oldSolde} --> ${user.money}`)
            return user.money;
        } else {
            this.logger.error(`update: error between oldSolde from front (${oldSolde}) and user.money in database (${user.money}))`)
            return null;
        }
    }
}
