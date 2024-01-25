import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
    ) {}
  
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
    
    return { name: createdUser.name }
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
