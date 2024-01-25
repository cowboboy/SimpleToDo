import { FC, useState } from "react";
import { AuthService } from "../services/auth.service";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Auth: FC = () => {
  const [isAuth, setIsAuth] = useState(false)
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  function login() {
  }

  async function registrate(e: React.FormEvent) {
    e.preventDefault()
    try {
      localStorage.setItem("Authorization", await AuthService.registrate({name, password}))
      navigate("/")
      toast.success('The account has been created', {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (err: any) {
      toast.error(err.response.data.message[0], {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
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