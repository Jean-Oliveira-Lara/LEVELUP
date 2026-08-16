import { useState, useEffect, useRef } from "react";

import Layout from "../components/layout/Layout";
import ReadingCard from "../components/study/ReadingCard";
import ReadingQuiz from "../components/study/ReadingQuiz";

import readings from "../data/readings";
import { completeActivity } from "../services/activities";

function Reading() {
  const reading = readings[0];

  const [startQuiz, setStartQuiz] = useState(false);
  const [score, setScore] = useState(null);
  const [awarding, setAwarding] = useState(true);

  // Mesmo raciocínio do Vocabulary.jsx: antes o "+40 XP" era só visual.
  const awardedRef = useRef(false);

  useEffect(() => {
    if (score === null || awardedRef.current) return;

    awardedRef.current = true;
    setAwarding(true);

    completeActivity("reading", reading.xp, `reading:${reading.id}`)
      .then((result) => {
        if (result.error) {
          console.error("Erro ao concluir reading:", result.error);
        }
      })
      .finally(() => setAwarding(false));
  }, [score, reading.id, reading.xp]);

  if (score !== null) {
    return (
      <Layout>
        <div className="reading-card">
          <h1>🎉 Reading Concluído!</h1>

          <h2>
            Acertos: {score}/{reading.questions.length}
          </h2>

          <h2
            style={{
              color: "#22c55e",
              marginTop: "20px",
            }}
          >
            {awarding ? "Salvando..." : `+${reading.xp} XP`}
          </h2>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1
        style={{
          color: "white",
        }}
      >
        📚 Reading
      </h1>

      {!startQuiz ? (
        <>
          <ReadingCard reading={reading} />

          <button
            style={{
              marginTop: "25px",
            }}
            onClick={() => setStartQuiz(true)}
          >
            Responder Perguntas
          </button>
        </>
      ) : (
        <ReadingQuiz
          reading={reading}
          onFinish={setScore}
        />
      )}
    </Layout>
  );
}

export default Reading;
