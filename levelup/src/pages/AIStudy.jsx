import Layout from "../components/layout/Layout";
import LessonProgress from "../components/study/LessonProgress";
import StudySession from "../components/study/StudySession";

function AIStudy() {

  const steps = [
    { id: 1, title: "Vocabulary", icon: "📖" },
    { id: 2, title: "Reading", icon: "📚" },
    { id: 3, title: "Listening", icon: "🎧" },
    { id: 4, title: "Grammar", icon: "✍️" },
    { id: 5, title: "Speaking", icon: "🎤" },
    { id: 6, title: "Tutor IA", icon: "🤖" },
  ];

  return (
    <Layout>
      <h1
        style={{
          color: "white",
        }}
      >
        🤖 Tutor IA
      </h1>

      <p
        style={{
          color: "#94a3b8",
        }}
      >
        Complete todos os módulos para finalizar a lição.
      </p>

      <LessonProgress
        steps={steps}
        currentStep={0}
      />

      <StudySession />
    </Layout>
  );
}

export default AIStudy;