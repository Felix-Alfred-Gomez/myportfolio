import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { app } from "../../firebaseConfig";
import "../../styles/common.css"; // Use the same CSS as Login

function RegisterModal({ onRegisterSuccess }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState("");

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
      // alert("Registration successful! A verification email has been sent to your email address.");

      if (onRegisterSuccess) onRegisterSuccess();} 
      
      catch (err) {setError(err.message);}
  };

  return (
  <div className="modal-template">

    <h2 style={{ marginBottom: "1.5rem" }}> Inscription </h2>

    <form onSubmit={handleRegister}
      className="modal-login-format">
      <input
        type="text"
        placeholder="Nom d'utilisateur"
        value={username}
        onChange={handleUsernameChange}
        className="modal-input-box"
      />
      {usernameError && <p className="login-error">{usernameError}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="modal-input-box"
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="modal-input-box"
      />
      <button type="submit" >S'inscrire</button>
    </form>
      {error && <p className="modal-error">{error}</p>}
    
    <div className="modal-footer">
      Note : Le nom d'utilisateur définira l'URL publique de votre portfolio. 
      Il pourra être changé plus tard dans les paramètres de votre compte.
    </div>
    
  </div>
  );
}

export default RegisterModal;