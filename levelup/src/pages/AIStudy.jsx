import Layout from "../components/layout/Layout";
import StudySession from "../components/study/StudySession";

function AIStudy() {
  return (
    <Layout>
      <h1 style={{ color: "white" }}>
        🤖 Tutor IA
      </h1>

      <p
        style={{
          color: "#94a3b8",
          marginBottom: "30px",
        }}
      >
        Complete sua sessão de estudos de hoje.
      </p>

      <StudySession />
    </Layout>
  );
}

export default AIStudy;