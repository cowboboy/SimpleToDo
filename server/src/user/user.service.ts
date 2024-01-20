import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}
  
  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userRepository.findOne({
      where: {
        name: createUserDto.name
      }
    })

    if (existUser) throw new BadRequestException("User with this name already exists")

    const createdUser = await this.userRepository.save({
      name: createUserDto.name,
      password: await bcrypt.hash(createUserDto.password, 10),
    })
    
    return { createdUser }
  }

  async findOneById(id: number) {
    return await this.userRepository.findOne({
      where: {
        id
      }
    })
  }

  async findOneByName(name: string) {
    return await this.userRepository.findOne({
      where: {
        name
      }
    })
  }
}
