import "../styles/login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../services/auth";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    const { error } = await signIn(email, password);

    if (error) {
      alert(error.message);
      return;
    }

    navigate("/dashboard");
  }

  return (
    <div className="login-container">
      <form
        className="login-card"
        onSubmit={handleLogin}
      >
        <h1>LevelUp</h1>

        <p>Faça login para continuar</p>

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          Entrar
        </button>

        <p>
          Não possui conta?
          <Link to="/register"> Criar conta</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;