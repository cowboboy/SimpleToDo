import {FC} from 'react'
import { useAuth } from '../hooks/useAuth'

interface Props {
    children: JSX.Element
}

export const ProtectedRoot: FC<Props> = ({children}) => {
    const isAuth = useAuth()

    return (
        <div>
            {isAuth ? (
                    children
                ) : 
                (
                    <div>To view this page you must be logged in</div>
                )}
        </div>
    )
}