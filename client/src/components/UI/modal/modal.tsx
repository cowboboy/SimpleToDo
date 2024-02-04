import { ActionFunction, Form, redirect } from "react-router-dom"
import style from "./modal.module.css"
import {FC} from 'react'
import { TasksService } from "../../../services/tasks.service"
import { ITaskData } from "../../../types/types"

interface Props {
    setVisible: (visible: Boolean) => void,
    id?: number,
    type?: "post" | "patch"
}

export const sendTaskData: ActionFunction = async ({ request, params }) => {
    const formData = await request.formData();
    switch(request.method) {
        case 'POST':
            const task = {
                message: formData.get("message")
            } as ITaskData
            console.log(await TasksService.create(task))
            return null
    }
}

export const Modal: FC<Props> = ({setVisible, id, type}) => {

    return (
        <div className={style.modal} onClick={()=>setVisible(false)}>
            <div className={style.modalContent} onClick={e => e.stopPropagation()}>
                <Form method="post">
                    <input type="hidden" name="id" value={id}></input>
                    <input type="text" name="message"></input>
                    <button type="submit">Соханить</button>
                    <button type="button">Отмена</button>
                </Form>
            </div>
        </div>
    )
}