import { FC } from "react";
import { TasksService } from "../services/tasks.service";
import { useLoaderData } from "react-router-dom";
import { ITask } from "../types/types";

export async function loadTasks() {
  const tasks = await TasksService.getAll()

  return tasks
}

export const Tasks: FC = () => {
  const tasks = useLoaderData() as ITask[]

  return (
    <div>
        <h1>Tasks</h1>
        {
          tasks && tasks.map(task => (
            <div key={task.id}>
              <p>{task.message}</p>
              <p>{task.createdAt}</p>
              <p>{task.updatedAt}</p>
            </div>
          ))
        }
    </div>
  )
}