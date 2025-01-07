import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import "./Topic.css";

const Topic = () => {
  const { chapterId, topicId } = useParams();

  return (
    <motion.div
      className="topic-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>
        Topic {topicId} du Chapitre {chapterId}
      </h2>
      {/* Contenu du topic */}
    </motion.div>
  );
};

export default Topic;
