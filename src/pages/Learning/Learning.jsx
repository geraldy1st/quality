import React from "react";
import { Link } from "react-router-dom";
import "./Learning.css";

const chapters = [
  {
    id: 1,
    title: "Les Fondamentaux des Tests",
    topics: [
      "Pourquoi les tests sont nécessaires",
      "Qu'est-ce que le test logiciel ?",
      "Les 7 principes du test",
      "Processus de test fondamental",
      "La psychologie des tests",
    ],
  },
  {
    id: 2,
    title: "Tester pendant le Cycle de Vie",
    topics: [
      "Modèles de développement logiciel",
      "Niveaux de test",
      "Types de test",
      "Tests de maintenance",
    ],
  },
  {
    id: 3,
    title: "Tests Statiques",
    topics: [
      "Bases des tests statiques",
      "Processus de revue",
      "Analyse statique par outils",
    ],
  },
  {
    id: 4,
    title: "Techniques de Test",
    topics: [
      "Techniques de test boîte noire",
      "Techniques de test boîte blanche",
      "Techniques basées sur l'expérience",
    ],
  },
  {
    id: 5,
    title: "Gestion des Tests",
    topics: [
      "Organisation des tests",
      "Estimation et planification",
      "Contrôle et suivi",
      "Gestion de configuration",
    ],
  },
  {
    id: 6,
    title: "Outils de Support aux Tests",
    topics: [
      "Types d'outils de test",
      "Usage efficace des outils",
      "Introduction des outils dans une organisation",
    ],
  },
];

const Learning = () => {
  return (
    <div className="learning">
      <header className="learning-header">
        <h1>Programme d'Apprentissage ISTQB</h1>
        <p>Parcourez les chapitres du syllabus Foundation Level</p>
      </header>

      <div className="chapters-grid">
        {chapters.map((chapter) => (
          <div key={chapter.id} className="chapter-card">
            <div className="chapter-header">
              <span className="chapter-number">Chapitre {chapter.id}</span>
              <h2>{chapter.title}</h2>
            </div>
            <ul className="topics-list">
              {chapter.topics.map((topic, index) => (
                <li key={index}>
                  <Link
                    to={`/learning/chapter/${chapter.id}/topic/${index + 1}`}
                  >
                    {topic}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="chapter-footer">
              <button className="start-chapter">Commencer ce chapitre</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Learning;
