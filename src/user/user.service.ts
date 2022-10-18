import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    //TODO:  penser à enlever les password dans le return
    return this.userRepository.find();
  }
  
  findOne(id: number): Promise<User> {
    // TODO:  penser à enlever les password dans le return
    return this.userRepository.findOneBy({ id });
  }

  findOneByUsername(username: string): Promise<User> {
    // TODO:  penser à enlever les password dans le return
    return this.userRepository.findOneBy({username});
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
    return result
  }
  
  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
