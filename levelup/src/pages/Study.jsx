import { useNavigate, useParams } from "react-router-dom";

import Layout from "../components/layout/Layout";
import StudyCard from "../components/study/StudyCard";

import { useLesson } from "../hooks/useLesson";

function Study() {
  const navigate = useNavigate();

  const { lessonId } = useParams();

  const {
    getLessonById,
    loading,
  } = useLesson();

  if (loading) {
    return (
      <Layout>
        <h2>Carregando...</h2>
      </Layout>
    );
  }

  const lesson = getLessonById(Number(lessonId));

  if (!lesson) {
    return (
      <Layout>
        <h2 style={{ color: "white" }}>
          Lição não encontrada.
        </h2>
      </Layout>
    );
  }

  return (
    <Layout>
      <div
        style={{
          marginBottom: "40px",
        }}
      >
        <h1
          style={{
            color: "white",
            fontSize: "36px",
            marginBottom: "10px",
          }}
        >
          📚 Sessão de Estudos
        </h1>

        <p
          style={{
            color: "#94a3b8",
            fontSize: "18px",
            marginBottom: "30px",
          }}
        >
          Escolha uma atividade para continuar esta lição.
        </p>

        <div
          style={{
            background: "#1e293b",
            border: "1px solid #334155",
            borderRadius: "20px",
            padding: "25px",
            marginBottom: "30px",
          }}
        >
          <h2
            style={{
              color: "white",
              marginBottom: "10px",
            }}
          >
            📚 {lesson.title}
          </h2>

          <p
            style={{
              color: "#94a3b8",
              marginBottom: "15px",
            }}
          >
            {lesson.description}
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "15px",
            }}
          >
            <span
              style={{
                color: "#38bdf8",
                fontWeight: "bold",
              }}
            >
              Nível: {lesson.level}
            </span>

            <span
              style={{
                color: "#22c55e",
                fontWeight: "bold",
              }}
            >
              ⭐ {lesson.xp} XP
            </span>
          </div>
        </div>
      </div>

      <StudyCard
        icon="📖"
        title="Vocabulary"
        description="Aprenda novas palavras e expressões."
        color="#3b82f6"
        onClick={() => navigate("/vocabulary")}
      />

      <StudyCard
        icon="🎧"
        title="Listening"
        description="Treine sua compreensão auditiva."
        color="#22c55e"
        onClick={() => navigate("/listening")}
      />

      <StudyCard
        icon="📚"
        title="Reading"
        description="Leia textos em inglês."
        color="#f59e0b"
        onClick={() => navigate("/reading")}
      />

      <StudyCard
        icon="✍️"
        title="Grammar"
        description="Aprenda gramática de forma prática."
        color="#ec4899"
        onClick={() => navigate("/grammar")}
      />

      <StudyCard
        icon="🤖"
        title="Tutor IA"
        description="Converse com a IA para praticar inglês."
        color="#8b5cf6"
        onClick={() => navigate("/ai")}
      />
    </Layout>
  );
}

export default Study;