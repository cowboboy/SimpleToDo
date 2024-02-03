import style from "./modal.module.css"
import {FC} from 'react'

interface Props {
    setVisible: (visible: Boolean) => void,
    id?: Number,
    type?: "post" | "patch"
}

export const Modal: FC<Props> = ({setVisible, id, type}) => {

    return (
        <div className={style.modal} onClick={()=>setVisible(false)}>
            <div className={style.modalContent} onClick={e => e.stopPropagation()}>
            </div>
        </div>
    )
}