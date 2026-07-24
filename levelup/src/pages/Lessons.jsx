import { useNavigate } from "react-router-dom";

import Layout from "../components/layout/Layout";

import { useLesson } from "../hooks/useLesson";

function Lessons() {
  const navigate = useNavigate();

  const {
    lessons,
    loading,
  } = useLesson();

  console.log("DEBUG lessons:", lessons, "loading:", loading);

  if (loading) {
    return (
      <Layout>
        <h2>Carregando...</h2>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1
        style={{
          color: "white",
          marginBottom: "10px",
        }}
      >
        📚 Lições
      </h1>

      <p
        style={{
          color: "#94a3b8",
          marginBottom: "30px",
        }}
      >
        Escolha uma lição para continuar seus estudos.
      </p>

      <div
        style={{
          display: "grid",
          gap: "20px",
        }}
      >
        {(lessons ?? []).map((lesson) => (
          <div
            key={lesson.id}
            onClick={() => navigate(`/study/${lesson.id}`)}
            style={{
              background: "#1e293b",
              padding: "25px",
              borderRadius: "12px",
              border: "1px solid #334155",
              cursor: "pointer",
              transition: "0.2s",
            }}
          >
            <h2
              style={{
                color: "white",
                marginBottom: "10px",
              }}
            >
              {lesson.position}. {lesson.title}
            </h2>

            <p
              style={{
                color: "#cbd5e1",
                marginBottom: "20px",
              }}
            >
              {lesson.description}
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  color: "#38bdf8",
                  fontWeight: "bold",
                }}
              >
                {lesson.level}
              </span>

              <span
                style={{
                  color: "#facc15",
                  fontWeight: "bold",
                }}
              >
                ⭐ {lesson.xp} XP
              </span>
            </div>

            <button
              style={{
                marginTop: "20px",
                width: "100%",
              }}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/study/${lesson.id}`);
              }}
            >
              ▶ Iniciar Lição
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default Lessons;