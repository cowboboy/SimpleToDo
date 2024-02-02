import { FC, useState } from "react";
import { AuthService } from "../services/auth.service";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import {login} from "../store/userSlice"

const Auth: FC = () => {
  const [isAuth, setIsAuth] = useState(true)
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  async function loginHandle(e: React.FormEvent) {
    try {
      e.preventDefault()
      const data = await AuthService.login({name, password})
      if (data) {
        localStorage.setItem("token", data.token)
        dispatch(login(data))
        navigate("/")
        toast.success('You logged in');
      }
    } catch (err: any) {
      console.log(err)
      toast.error(err.response.data.message[0]);
    }
  }

  async function registrateHandle(e: React.FormEvent) {
    try {
      e.preventDefault()
      const data = await AuthService.registrate({name, password})
      if (data) {
        setIsAuth(true)
        toast.success('The account has been created');
      }
    } catch (err: any) {
      toast.error(err.response.data.message[0]);
    }
  }

  return (
    <div>
      {
        isAuth ?
          <h1>Auth</h1>
          :
          <h1>Registration</h1>
      }
      <form onSubmit={ isAuth ? loginHandle : registrateHandle }>
        <input type="text" placeholder="name" onChange={e => setName(e.target.value)}></input>
        <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)}></input>
        <button>Submit</button>
      </form>
      {
        isAuth ?
          (
            <button onClick={() => setIsAuth(!isAuth)}>You arent registrated?</button>
          )
          :
          (
            <button onClick={() => setIsAuth(!isAuth)}>You are already registrated?</button>
          )
      }

    </div>
  )
}

export default Auth