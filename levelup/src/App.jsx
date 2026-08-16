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
import Goals from "./pages/Goals";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirecionamento */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Autenticação (públicas) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Área logada — protegida por ProtectedRoute */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/lessons"
          element={
            <ProtectedRoute>
              <Lessons />
            </ProtectedRoute>
          }
        />

        {/* Antes só existia a rota "/study" sem parâmetro, mas
            Lessons.jsx navega para `/study/${lesson.id}` — a rota
            simplesmente não existia e caía no "*" (voltava pro login). */}
        <Route
          path="/study/:lessonId"
          element={
            <ProtectedRoute>
              <Study />
            </ProtectedRoute>
          }
        />
        <Route
          path="/study"
          element={
            <ProtectedRoute>
              <Study />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vocabulary"
          element={
            <ProtectedRoute>
              <Vocabulary />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reading"
          element={
            <ProtectedRoute>
              <Reading />
            </ProtectedRoute>
          }
        />

        <Route
          path="/listening"
          element={
            <ProtectedRoute>
              <Listening />
            </ProtectedRoute>
          }
        />

        <Route
          path="/grammar"
          element={
            <ProtectedRoute>
              <Grammar />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ai"
          element={
            <ProtectedRoute>
              <AIStudy />
            </ProtectedRoute>
          }
        />

        {/* Usuário */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/statistics"
          element={
            <ProtectedRoute>
              <Statistics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/goals"
          element={
            <ProtectedRoute>
              <Goals />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* Página não encontrada */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
