import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/register.css";

import { signUp } from "../services/auth";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleRegister(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    const { error } = await signUp(name, email, password);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Conta criada com sucesso!");

    navigate("/");
  }

  return (
    <div className="register-container">
      <form
        className="register-card"
        onSubmit={handleRegister}
      >
        <h1>Criar Conta</h1>

        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <input
          type="password"
          placeholder="Confirmar senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button type="submit">
          Cadastrar
        </button>

        <p>
          Já possui conta?
          <Link to="/"> Entrar</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;