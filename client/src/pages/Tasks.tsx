import { FC, useState } from "react";
import { TasksService } from "../services/tasks.service";
import { ActionFunction, useLoaderData } from "react-router-dom";
import { ITask, ITaskData } from "../types/types";
import { Modal } from "../components/UI/modal/modal";

export async function loadTasks() {
  const tasks = await TasksService.getAll()

  return tasks
}

export const sendTaskData: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  console.log(1)
  switch(request.method) {
      case 'POST':
          const task = {
              message: formData.get("message")
          } as ITaskData
          console.log(await TasksService.create(task))
          return null
      case 'PATCH':
        const updatedTask = {
          message: formData.get("message")
        } as Partial<ITaskData>
        const id = Number(formData.get("id"))
        await TasksService.update(id, updatedTask)
        return null
  }
}

export const Tasks: FC = () => {
  const tasks = useLoaderData() as ITask[]

  const [isModalVisible, setModalVisible] = useState<Boolean>(false)
  const [taskId, setTaskId] = useState(null)
  const [isEdit, setIsEdit] = useState(false)

  return (
    <div>
        <h1>Tasks</h1>
        <button onClick={() => setModalVisible(true)}>Create task</button>
        {
          tasks && tasks.map(task => (
            <div key={task.id}>
              <p>{task.message}</p>
              <p>{task.createdAt}</p>
              <p>{task.updatedAt}</p>
            </div>
          ))
        }
        {
          isModalVisible && <Modal type="post" setVisible={vis => setModalVisible(vis)}/>
        }
    </div>
  )
}