import { useNavigate } from "react-router-dom";

import Layout from "../components/layout/Layout";
import StudyCard from "../components/study/StudyCard";

function Study() {
  const navigate = useNavigate();

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
          Escolha uma atividade e evolua no seu inglês.
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
            📚 Lição de Hoje
          </h2>

          <h3
            style={{
              color: "#60a5fa",
              marginBottom: "10px",
            }}
          >
            Daily Routine
          </h3>

          <p
            style={{
              color: "#94a3b8",
              marginBottom: "15px",
            }}
          >
            Aprenda vocabulário, gramática, leitura, listening e pratique com a IA.
          </p>

          <p
            style={{
              color: "#22c55e",
              fontWeight: "bold",
            }}
          >
            ⭐ Recompensa: +150 XP
          </p>
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