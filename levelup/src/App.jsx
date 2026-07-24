import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import Lessons from "./pages/Lessons";

import Study from "./pages/Study";
import Vocabulary from "./pages/Vocabulary";
import Listening from "./pages/Listening";
import Reading from "./pages/Reading";
import Grammar from "./pages/Grammar";
import AIStudy from "./pages/AIStudy";

import Statistics from "./pages/Statistics";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirecionamento */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* Autenticação */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* Lições */}
        <Route
          path="/lessons"
          element={<Lessons />}
        />

        {/* Estudo */}
        <Route
          path="/study"
          element={<Study />}
        />

        <Route
          path="/vocabulary"
          element={<Vocabulary />}
        />

        <Route
          path="/reading"
          element={<Reading />}
        />

        <Route
          path="/listening"
          element={<Listening />}
        />

        <Route
          path="/grammar"
          element={<Grammar />}
        />

        <Route
          path="/ai"
          element={<AIStudy />}
        />

        {/* Usuário */}
        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/statistics"
          element={<Statistics />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

        {/* Página não encontrada */}
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;