import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  
  findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }
  
  async create(user: CreateUserDto): Promise<User> {
    const userEntity: User = User.create();
    userEntity.firstName = user.firstName;
    userEntity.lastName = user.lastName;
    userEntity.password = user.password;
    userEntity.username = user.username;
    await User.save(userEntity);
    return userEntity
  }
  
  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
