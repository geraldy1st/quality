import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCheckCircle, FaBook, FaChartLine } from "react-icons/fa";
import { Helmet } from "react-helmet";
import "./Home.css";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Quality - Préparation à la certification</title>
        <meta
          name="description"
          content="Préparez-vous à la certification ISTQB avec notre plateforme d'apprentissage interactive. Cours, quiz et exercices pratiques."
        />
      </Helmet>
      <div className="home">
        <motion.section
          className="hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Bienvenue sur Quality</h1>
          <p>
            Préparez-vous à la certification ISTQB de manière interactive et
            efficace
          </p>
          <div className="cta-buttons">
            <Link to="/learning" className="cta-button">
              Commencer à apprendre
            </Link>
            <Link to="/quiz" className="cta-button secondary">
              Tester vos connaissances
            </Link>
          </div>
        </motion.section>

        <motion.section
          className="features"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2>Pourquoi choisir notre plateforme ?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <FaCheckCircle className="feature-icon" />
              <h3>Contenu Certifié</h3>
              <p>Matériel d'étude aligné sur le syllabus ISTQB officiel</p>
            </div>
            <div className="feature-card">
              <FaBook className="feature-icon" />
              <h3>Apprentissage Interactif</h3>
              <p>Quiz et exercices pratiques pour tester vos connaissances</p>
            </div>
            <div className="feature-card">
              <FaChartLine className="feature-icon" />
              <h3>Suivi de Progression</h3>
              <p>
                Suivez votre évolution et identifiez vos points d'amélioration
              </p>
            </div>
          </div>
        </motion.section>

        <section className="learning-paths">
          <h2>Parcours d'apprentissage</h2>
          <div className="paths-grid">
            <div className="path-card">
              <h3>Fondamentaux</h3>
              <ul>
                <li>Principes fondamentaux des tests</li>
                <li>Test tout au long du cycle de vie</li>
                <li>Types de tests</li>
              </ul>
            </div>
            <div className="path-card">
              <h3>Techniques</h3>
              <ul>
                <li>Tests boîte noire</li>
                <li>Tests boîte blanche</li>
                <li>Tests basés sur l'expérience</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="certification-levels">
          <h2>Niveaux de Certification ISTQB</h2>
          <div className="levels-grid">
            <div className="level-card">
              <h3>Foundation Level</h3>
              <p>Le niveau essentiel pour débuter dans le test logiciel</p>
              <ul>
                <li>Concepts fondamentaux</li>
                <li>Durée : 3 jours</li>
                <li>Examen : 40 questions</li>
              </ul>
            </div>
            <div className="level-card">
              <h3>Advanced Level</h3>
              <p>Pour approfondir vos connaissances</p>
              <ul>
                <li>Test Manager</li>
                <li>Test Analyst</li>
                <li>Technical Test Analyst</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
