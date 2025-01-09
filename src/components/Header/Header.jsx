import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import SettingsIcon from "@mui/icons-material/Settings";
import "./Header.css";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  const getUserDisplayName = () => {
    if (user.displayName) {
      return user.displayName;
    }
    const googleUser = user.providerData?.find(
      (provider) => provider.providerId === "google.com"
    );
    if (googleUser?.displayName) {
      return googleUser.displayName;
    }
    return user.email.split("@")[0];
  };

  const getProfileImage = () => {
    if (user.photoURL && !user.photoURL.includes("googleusercontent.com")) {
      return user.photoURL;
    }
    const googleProvider = user.providerData?.some(
      (provider) => provider.providerId === "google.com"
    );
    if (googleProvider && user.photoURL) {
      return user.photoURL;
    }
    return "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  };

  return (
    <header className="header">
      <Link to="/" className="logo">
        Quality
      </Link>
      {user && (
        <div className="user-menu">
          <Link to="/settings" className="settings-link" title="Paramètres">
            <SettingsIcon />
          </Link>
          <Link to="/profile" className="user-info">
            <img
              src={getProfileImage()}
              alt="Profile"
              className="header-profile-photo"
            />
            <span className="user-name">{getUserDisplayName()}</span>
          </Link>
          {location.pathname === "/profile" && (
            <button onClick={handleLogout} className="logout-button">
              Déconnexion
            </button>
          )}
        </div>
      )}
      {!user && (
        <Link to="/login" className="login-link">
          Connexion
        </Link>
      )}
    </header>
  );
};

export default Header;
