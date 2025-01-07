import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ProgressContext } from "../../context/ProgressContext";
import { motion } from "framer-motion";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import TopicsList from "../../components/TopicsList/TopicsList";
import "./Chapter.css";

const Chapter = () => {
  const { chapterId, topicId } = useParams();
  const { progress, updateProgress } = useContext(ProgressContext);

  return (
    <motion.div
      className="chapter-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="chapter-navigation">
        <ProgressBar progress={progress.totalProgress} />
        <TopicsList chapter={chapterId} currentTopic={topicId} />
      </div>
      <div className="topic-content">{/* Contenu dynamique du chapitre */}</div>
    </motion.div>
  );
};

export default Chapter;
