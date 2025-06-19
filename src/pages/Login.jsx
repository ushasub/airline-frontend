import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  // Define email & password FIRST
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  /*const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    console.warn("Empty email or password");
    return;
  }

  try {
    const res = await fetch("http://localhost:4000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      login(data);
      navigate("/dashboard");
    } else {
      alert(data.message || "Login failed");
    }
  } catch (err) {
    console.error("Login error:", err);
  }
};*/

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    console.warn("Empty email or password");
    return;
  }

  try {
    const data = await login(email, password);  // Using the context's login

    if (data) {
      navigate("/dashboard");
    } else {
      alert("Login failed");
    }
  } catch (err) {
    console.error("Login error:", err);
    alert("Login failed: " + err.message);
  }
};

  return (
    <main>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </main>
  );
};

export default Login;