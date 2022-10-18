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

  async findAll(): Promise<any[]> {
    let data = await this.userRepository.find();
    let users=[]
    data.forEach(element => {
      let {password, ...user} = element
      users.push(user)
    });
    return users;
  }
  
  async findOne(id: number): Promise<any> {
    let data = await this.userRepository.findOneBy({ id });
    let { password, ...user } = data;
    return user;
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
