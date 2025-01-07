import React, { useContext, useState, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { auth } from "../../config/firebase";
import "./Profile.css";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const getProfileImage = () => {
    // Si l'utilisateur a une photo personnalisée
    if (user.photoURL && !user.photoURL.includes("googleusercontent.com")) {
      return user.photoURL;
    }

    // Si l'utilisateur est connecté avec Google
    const googleProvider = user.providerData?.some(
      (provider) => provider.providerId === "google.com"
    );

    if (googleProvider && user.photoURL) {
      return user.photoURL;
    }

    // Image par défaut si aucune des conditions précédentes n'est remplie
    return "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Veuillez sélectionner une image");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Vérification des variables d'environnement
      if (
        !process.env.REACT_APP_CLOUDINARY_CLOUD_NAME ||
        !process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
      ) {
        throw new Error("Configuration Cloudinary manquante");
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
      );
      formData.append("folder", `quality/profile-photos/${user.uid}`);

      console.log("Début upload vers Cloudinary..."); // Debug

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        console.error("Erreur Cloudinary:", responseData); // Debug
        throw new Error(
          responseData.error?.message || "Erreur lors de l'upload"
        );
      }

      console.log("Upload réussi:", responseData); // Debug

      const photoURL = responseData.secure_url;

      await updateProfile(user, { photoURL });

      const currentUser = auth.currentUser;
      if (currentUser) {
        await currentUser.reload();
      }
    } catch (error) {
      console.error("Erreur détaillée:", error); // Debug
      setError(`Erreur lors de la mise à jour de la photo: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-photo-container" onClick={handleImageClick}>
            {loading ? (
              <div className="loading-spinner">Chargement...</div>
            ) : (
              <>
                <img
                  src={getProfileImage()}
                  alt="Profile"
                  className="profile-photo"
                />
                <div className="photo-overlay">
                  <span>Modifier</span>
                </div>
              </>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            style={{ display: "none" }}
          />
          {error && <div className="error-message">{error}</div>}
        </div>

        <h2>Mon Profil</h2>
        <div className="profile-info">
          <div className="info-group">
            <label>Email</label>
            <p>{user.email}</p>
          </div>
          <div className="info-group">
            <label>Type de connexion</label>
            <p>
              {user.providerData?.some(
                (provider) => provider.providerId === "google.com"
              )
                ? "Google"
                : "Email/Mot de passe"}
            </p>
          </div>
          <div className="info-group">
            <label>Date d'inscription</label>
            <p>{user.metadata.creationTime}</p>
          </div>
          <div className="info-group">
            <label>Dernière connexion</label>
            <p>{user.metadata.lastSignInTime}</p>
          </div>
        </div>
        <div className="profile-stats">
          <div className="stat-card">
            <h3>Progression</h3>
            <p>0%</p>
          </div>
          <div className="stat-card">
            <h3>Quiz complétés</h3>
            <p>0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
