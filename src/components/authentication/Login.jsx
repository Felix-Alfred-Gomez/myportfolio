import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, reload } from "firebase/auth";
import { app } from "../../firebaseConfig";
import "../../styles/Login.css"; // Import the dedicated CSS file

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await reload(user);

      if (user.emailVerified) {
        onLoginSuccess(); // Notify parent component of successful login
      } else {
        setError("Please verify your email before logging in.");
        navigate("/verify-email");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-card">
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button type="submit" className="login-button">Login</button>
      </form>
      {error && <p className="login-error">{error}</p>}
      <p className="login-footer">
        Don't have an account? <Link to="/register" className="login-link">Register here</Link>
      </p>
    </div>
  );
}

export default Login;