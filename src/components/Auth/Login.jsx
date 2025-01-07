import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { auth, googleProvider } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import "./Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      setError("Email ou mot de passe incorrect");
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
        <h2>Connexion</h2>
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
        <button type="submit">Se connecter</button>
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
          Pas encore de compte ? <Link to="/register">S'inscrire</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
