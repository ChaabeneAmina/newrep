import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    if (username === "admin" && password === "1234") {
      onLogin();
      navigate("/services");
    } else {
      alert("Identifiants incorrects !");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Utilisateur" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit"></button>
    </form>
  );
}

export default Login;
