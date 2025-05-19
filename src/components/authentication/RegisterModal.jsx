import { useState, useRef } from "react";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth";
import { getDatabase, ref, set, get, query, orderByChild, equalTo } from "firebase/database";
import { app } from "../../firebaseConfig";
import "../../styles/common.css"; // Use the same CSS as Login

function RegisterModal({ onRegisterSuccess }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const debounceTimeout = useRef(null);

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z0-9-_]+$/;
    setUsername(value);
    setError("");
    if (!regex.test(value)) {
      setError("Le nom d'utilisateur ne peut contenir que des lettres, des chiffres, des tirets et des underscores.");
      return;
    }
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    if (value.length > 0) {
      debounceTimeout.current = setTimeout(async () => {
        const available = await checkUsernameAvailable(value);
        if (!available) {
          setError("Ce nom d'utilisateur est déjà pris.");
        } else {
          setError("");
        }
      }, 500);
    }
  };

  // Check if username is available in Realtime Database
  const checkUsernameAvailable = async (username) => {
    const database = getDatabase(app);
    const usersRef = ref(database, "users");
    const q = query(usersRef, orderByChild("username"), equalTo(username));
    const snapshot = await get(q);
    return !snapshot.exists(); // true if available
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (error) {
      // Just return, error will be shown in the UI
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