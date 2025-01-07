import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";
import { auth, googleProvider } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      return setError("Les mots de passe ne correspondent pas");
    }

    if (password.length < 6) {
      return setError("Le mot de passe doit contenir au moins 6 caractères");
    }

    try {
      await signup(email, password);
      navigate("/");
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("Cet email est déjà utilisé");
          break;
        case "auth/invalid-email":
          setError("Email invalide");
          break;
        case "auth/operation-not-allowed":
          setError("L'inscription par email n'est pas activée");
          break;
        case "auth/weak-password":
          setError("Le mot de passe est trop faible");
          break;
        default:
          setError("Erreur lors de l'inscription. Veuillez réessayer.");
      }
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      console.error("Erreur Google Sign-in:", error);
      setError("Erreur lors de la connexion avec Google");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Inscription</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirmer le mot de passe</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">S'inscrire</button>
        <div className="auth-separator">
          <span>ou</span>
        </div>
        <button
          type="button"
          className="google-button"
          onClick={signInWithGoogle}
        >
          <FcGoogle /> Continuer avec Google
        </button>
        <p className="auth-switch">
          Déjà inscrit ? <Link to="/login">Se connecter</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
