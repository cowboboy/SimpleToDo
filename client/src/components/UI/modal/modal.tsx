import { Form} from "react-router-dom"
import style from "./modal.module.css"
import {FC} from 'react'

interface Props {
    setVisible: (visible: Boolean) => void,
    id?: number,
    type?: "post" | "patch"
}

export const Modal: FC<Props> = ({setVisible, id, type}) => {

    return (
        <div className={style.modal} onClick={()=>setVisible(false)}>
            <div className={style.modalContent} onClick={e => e.stopPropagation()}>
                {type === "post" ? "New task" : "Update task"}
                <Form method={type} onSubmit={() => setVisible(false)}>
                    <input type="hidden" name="id" value={id}></input>
                    <input type="text" name="message" placeholder="message..."></input>
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setVisible(false)}>Cancel</button>
                </Form>
            </div>
        </div>
    )
}