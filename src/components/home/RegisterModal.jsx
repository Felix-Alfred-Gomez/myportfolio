import { useState, useRef } from "react";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth";
import { getDatabase, ref, set} from "firebase/database";
import { app } from "../../firebaseConfig";
import "../../styles/common.css"; // Use the same CSS as Login
import { X } from "lucide-react";
import { checkUsernameAvailable, getUserCount } from "../../hooks/HandlePortfolioData";

function RegisterModal({ onRegisterSuccess, onClose }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
        const available = await checkUsernameAvailable(value, app);
        if (!available) {
          setError("Ce nom d'utilisateur est déjà pris.");
        } else {
          setError("");
        }
      }, 500);
    }
  };  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // Clear error at the start of registration
    
    if (error) {
      return;
    }
    
    setIsLoading(true); // Start loading
    
    try {
      // Check if user limit has been reached
      const userCount = await getUserCount();
      if (userCount >= 50) {
        setError(
          "Limite d'utilisateurs atteinte. Les nouvelles inscriptions sont temporairement suspendues. " +
          "Vous pouvez le développeur de ce site web: felix.alfred.gomez@gmail.com"
        );
        return;
      }
      
      const auth = getAuth(app);
      const database = getDatabase(app);
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await set(ref(database, `users/${user.uid}`), {
        username: username,
        email: email,
      });

      await sendEmailVerification(user);
      
      // Only call success callback if everything succeeded
      if (onRegisterSuccess) onRegisterSuccess(email);
      
    } catch (err) {
      // Handle different types of Firebase errors with user-friendly messages
      let errorMessage = "Une erreur est survenue lors de l'inscription.";
      
      if (err.code === "auth/email-already-in-use") {
        errorMessage = "Cette adresse email est déjà utilisée.";
      } else if (err.code === "auth/weak-password") {
        errorMessage = "Le mot de passe doit contenir au moins 6 caractères.";
      } else if (err.code === "auth/invalid-email") {
        errorMessage = "L'adresse email n'est pas valide.";
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
  <div className="modal-template">

    <button
      type="button"
      aria-label="Fermer"
      onClick={onClose}
      className="modal-close-button">
      <X size={20} color="white" />
    </button>

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
        onChange={(e) => {
          setEmail(e.target.value);
          setError(""); // Clear error on email change
        }}
        className="modal-input-box"
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setError(""); // Clear error on password change
        }}
        className="modal-input-box"
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
            <div className="spinner"></div>
            Inscription en cours...
          </div>
        ) : (
          "S'inscrire"
        )}
      </button>
    </form>
      {error && <p className="modal-error">{error}</p>}
    
    <div className="modal-footer">
      Note : Le nom d'utilisateur définira l'URL publique par défaut de votre portfolio. 
      Cette URL pourra être changé plus tard dans les paramètres de votre compte.
    </div>
    
  </div>
  );
}

export default RegisterModal;