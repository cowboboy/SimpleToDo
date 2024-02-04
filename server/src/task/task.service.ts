import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TaskService {
  constructor(@InjectRepository(Task) private readonly taskRepository: Repository<Task>) {}

  async create(createTaskDto: CreateTaskDto, userId: number) {
    const newTask = {
      message: createTaskDto.message,
      user: { id: userId }
    }
    const createdTask = await this.taskRepository.save(newTask)
    const {user, ...result} = createdTask
    return result
  }

  async findAll(userId: number) {
    return await this.taskRepository.find({
      where: {
        user: {
          id: userId
        }
      },
    })
  }

  async findOne(id: number) {
    return await this.taskRepository.findOne({
      where: {
        user: {
          id
        }
      },
      relations: {
        user: true
      },
    })
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.findOne({
      where: {
        user: {
          id
        }
      },
      relations: {
        user: true
      },
    })

    if (!task) throw new NotFoundException()

    return await this.taskRepository.save({
      ...task,
      ...updateTaskDto
    })
  }

  async remove(id: number) {
    const task = await this.taskRepository.findOne({
      where: {
        user: {
          id
        }
      },
      relations: {
        user: true
      },
    })

    if (!task) throw new NotFoundException()

    return this.taskRepository.delete({id})
  }

  async pagination(userId: number, page: number, limit: number) {
    return await this.taskRepository.find({
      where: {
        user: {id: userId}
      },
      take: limit,
      skip: (page-1) * limit
    })
  }
}
