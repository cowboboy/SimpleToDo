import { FC, useState } from "react";
import { AuthService } from "../services/auth.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Auth: FC = () => {
  const [isAuth, setIsAuth] = useState(false)
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  function login() {
  }

  async function registrate(e: React.FormEvent) {
    try {
      e.preventDefault()
      const data = await AuthService.registrate({name, password})
      if (data) {
        setIsAuth(true)
        localStorage.setItem("Authorization", data)
        navigate("/")
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
      <form onSubmit={ isAuth ? login : registrate }>
        <input type="text" placeholder="name" onChange={e => setName(e.target.value)}></input>
        <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)}></input>
        <button>Submit</button>
      </form>

    </div>
  )
}

export default Auth