import { FC, useState } from "react";
import { TasksService } from "../services/tasks.service";
import { ActionFunction, Form, useLoaderData } from "react-router-dom";
import { ITask, ITaskData } from "../types/types";
import { Modal } from "../components/UI/modal/modal";

export async function loadTasks() {
  const tasks = await TasksService.getAll()

  return tasks
}

export const sendTaskData: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  switch(request.method) {
      case 'POST':
          const task = {
              message: formData.get("message")
          } as ITaskData
          await TasksService.create(task)
          return null
      case 'PATCH':
        const updatedTask = {
          message: formData.get("message")
        } as Partial<ITaskData>
        const updateId = Number(formData.get("id"))
        await TasksService.update(updateId, updatedTask)
        return null
      case 'DELETE':
        const deleteId = Number(formData.get("id"))
        await TasksService.delete(deleteId)
        return null
  }
}

export const Tasks: FC = () => {
  const tasks = useLoaderData() as ITask[]

  const [isModalVisible, setModalVisible] = useState<Boolean>(false)
  const [taskId, setTaskId] = useState<string>()
  const [isEdit, setIsEdit] = useState(false)

  return (
    <div>
        <h1>Tasks</h1>
        <button onClick={() => {
          setModalVisible(true)
          setIsEdit(false)
        }}>Create task</button>
        {
          tasks && tasks.map(task => (
            <div key={task.id}>
              <p>{task.message}</p>
              <p>{task.createdAt}</p>
              <p>{task.updatedAt}</p>
              <button onClick={() => {
                setTaskId(task.id)
                setModalVisible(true)
                setIsEdit(true)
              }}>Edit</button>
              <Form method="delete">
                    <input type="hidden" name="id" value={task.id}></input>
                    <button type="submit">Delete</button>
              </Form>
            </div>
          ))
        }
        {
          isEdit ?
            isModalVisible && <Modal id={Number(taskId)} type="patch" setVisible={vis => setModalVisible(vis)}/>
            :
            isModalVisible && <Modal id={Number(taskId)} type="post" setVisible={vis => setModalVisible(vis)}/>
        }
    </div>
  )
}