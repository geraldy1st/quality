import React from "react";
import { Link } from "react-router-dom";
import "./TopicsList.css";

const TopicsList = ({ chapter, currentTopic }) => {
  return (
    <div className="topics-list">
      <h3>Sujets du Chapitre {chapter}</h3>
      {/* Liste des sujets à implémenter */}
    </div>
  );
};

export default TopicsList;
