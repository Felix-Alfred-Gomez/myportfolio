import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { app } from "../../firebaseConfig";
import "../../styles/Login.css"; // Use the same CSS as Login

function RegisterModal({ onRegisterSuccess, onClose }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z0-9-_]+$/;
    if (!regex.test(value)) {
      setUsernameError("Le nom d'utilisateur ne peut contenir que des lettres, des chiffres, des tirets et des underscores.");
    } else {
      setUsernameError("");
    }
    setUsername(value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (usernameError) {
      alert("Please fix the username error before submitting.");
      return;
    }
    const auth = getAuth(app);
    const database = getDatabase(app);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await set(ref(database, `users/${user.uid}`), {
        username: username,
        email: email,
      });

      await sendEmailVerification(user);
      alert("Registration successful! A verification email has been sent to your email address.");

      if (onRegisterSuccess) onRegisterSuccess();
      navigate("/verify-email");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-card">
      <form onSubmit={handleRegister} className="login-form">
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={handleUsernameChange}
          className="login-input"
        />
        {usernameError && <p className="login-error">{usernameError}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button type="submit" className="login-button">S'inscrire</button>
        {/* {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="login-button"
            style={{ background: "#e0e0e0", color: "#333", marginLeft: "10px" }}
          >
            Annuler
          </button>
        )} */}
      </form>
      {error && <p className="login-error">{error}</p>}
    </div>
  );
}

export default RegisterModal;