import React, { createContext, useState, useEffect } from "react";

export const ProgressContext = createContext();

// Définir le nombre total de topics
const totalTopics = 24; // Nombre total de sujets dans tous les chapitres

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(() => {
    const savedProgress = localStorage.getItem("learningProgress");
    return savedProgress
      ? JSON.parse(savedProgress)
      : {
          chaptersCompleted: [],
          topicsCompleted: [],
          quizzesTaken: [],
          totalProgress: 0,
        };
  });

  useEffect(() => {
    localStorage.setItem("learningProgress", JSON.stringify(progress));
  }, [progress]);

  const updateProgress = (chapterId, topicId) => {
    setProgress((prev) => ({
      ...prev,
      topicsCompleted: [...prev.topicsCompleted, `${chapterId}-${topicId}`],
      totalProgress: Math.round(
        ((prev.topicsCompleted.length + 1) / totalTopics) * 100
      ),
    }));
  };

  return (
    <ProgressContext.Provider value={{ progress, updateProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};
