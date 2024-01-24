import { FC, useState } from "react";
import { AuthService } from "../services/auth.service";

const Auth: FC = () => {
  const [isAuth, setIsAuth] = useState(false)
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

  function login() {
  }

  async function registrate(e: React.FormEvent) {
    e.preventDefault()
    try {
      await AuthService.registrate({name, password})
    } catch (err: any) {
      console.log(err)
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