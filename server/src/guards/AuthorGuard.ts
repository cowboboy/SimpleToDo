import { Injectable, CanActivate, ExecutionContext, ForbiddenException, BadRequestException } from '@nestjs/common';
import { TaskService } from 'src/task/task.service';

@Injectable()
export class AuthorGuard implements CanActivate {
    constructor(private readonly taskService: TaskService) {}

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest()

        const {id} = request.params
        
        const user = request.user
        const task = await this.taskService.findOne(+id)

        if (!task) {
            throw new BadRequestException("There is no task with this id")
        }

        if (user && user.userId === task.user.id) {
            return true
        }

        throw new ForbiddenException("This action is forbidden")
    }
}
