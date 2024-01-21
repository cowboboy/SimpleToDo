import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(@InjectRepository(Task) private readonly taskRepository: Repository<Task>) {}

  async create(createTaskDto: CreateTaskDto, userId: number) {
    const newTask = {
      message: createTaskDto.message,
      user: { id: userId }
    }

    return await this.taskRepository.save(newTask)
  }

  async findAll(userId: number) {
    return await this.taskRepository.find({
      where: {
        user: {
          id: userId
        }
      }
    })
  }

  async findOne(id: number) {
    return await this.taskRepository.findOneBy({id})
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.findOneBy({id})

    if (!task) throw new NotFoundException()

    return await this.taskRepository.save({
      ...task,
      ...updateTaskDto
    })
  }

  async remove(id: number) {
    const task = await this.taskRepository.findOneBy({id})

    if (!task) throw new NotFoundException()
    
    return this.taskRepository.delete({id})
  }
}
