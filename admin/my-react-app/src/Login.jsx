import axios from "axios";
import "./assets/Login.css"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
    
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const nav_to_admin = useNavigate()

    // Главная функция
    const login = async (e) => {

    e.preventDefault();
    setError(""); 

    try {
        const form = new URLSearchParams();
        form.append("username", username); 
        form.append("password", password);

        const response = await axios.post("http://127.0.0.1:8000/token", form);

        localStorage.setItem("token", response.data.access_token);
        setUsername("")

        setPassword("")
        nav_to_admin("/admin"); 
    }
    catch (e) {
        setError("Неверный логин или пароль!");
        console.error(e);
    }
}

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Админ-панель</h1>
        <p className="login-subtitle">Вход для администратора</p>

        <form className="login-form" onSubmit={login}> 
          <div className="form-group">
            <label>Логин</label>
            <input
              type="text" value = {username}
              placeholder="Введите логин" onChange = {e => setUsername(e.target.value)}
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <label>Пароль</label>
            <input
              type="password" value = {password}
              placeholder="Введите пароль" onChange = {e => setPassword(e.target.value)}
              autoComplete="off"
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" className="login-btn" >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
