import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database"; // Import Firebase Realtime Database
import { app } from "../../firebaseConfig";

function Register() {
  const [username, setUsername] = useState(""); // State for the username
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState(""); // State for username validation error
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z0-9-_]+$/; // Regex for valid URL characters
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
    const database = getDatabase(app); // Initialize the database
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save the username in the database
      await set(ref(database, `users/${user.uid}`), {
        username: username,
        email: email,
      });

      // Send verification email
      await sendEmailVerification(user);
      alert("Registration successful! A verification email has been sent to your email address.");

      // Redirect to the email verification page
      navigate("/verify-email");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="User Name"
          value={username}
          onChange={handleUsernameChange}
        />
        {usernameError && <p style={{ color: "red" }}>{usernameError}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Register;