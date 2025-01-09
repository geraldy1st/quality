import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home.jsx";
import Quiz from "./pages/Quiz/Quiz";
import Learning from "./pages/Learning/Learning";
import Profile from "./pages/Profile/Profile";
import { ProgressProvider } from "./context/ProgressContext";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import PrivateRoute from "./components/PrivateRoute";
import Settings from "./pages/Settings/Settings";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ProgressProvider>
          <Router>
            <div className="App">
              <Header />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Home />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/quiz"
                  element={
                    <PrivateRoute>
                      <Quiz />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/learning"
                  element={
                    <PrivateRoute>
                      <Learning />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <PrivateRoute>
                      <Settings />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </div>
          </Router>
        </ProgressProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
