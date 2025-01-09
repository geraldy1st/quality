import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import "./Settings.css";

const Settings = () => {
  const { user } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();

  const handleThemeChange = (e) => {
    toggleTheme(e.target.value);
  };

  return (
    <div className="settings-container">
      <div className="settings-card">
        <h2>Paramètres de {user.email}</h2>

        <section className="settings-section">
          <h3>Apparence</h3>
          <div className="settings-option">
            <label>Thème</label>
            <select value={theme} onChange={handleThemeChange}>
              <option value="light">Clair</option>
              <option value="dark">Sombre</option>
              <option value="system">Système</option>
            </select>
          </div>
        </section>

        <section className="settings-section">
          <h3>Notifications</h3>
          <div className="settings-option">
            <label>Emails de progression</label>
            <input type="checkbox" defaultChecked />
          </div>
          <div className="settings-option">
            <label>Rappels d'apprentissage</label>
            <input type="checkbox" defaultChecked />
          </div>
        </section>

        <section className="settings-section">
          <h3>Confidentialité</h3>
          <div className="settings-option">
            <label>Profil public</label>
            <input type="checkbox" />
          </div>
          <div className="settings-option">
            <label>Afficher la progression</label>
            <input type="checkbox" defaultChecked />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
