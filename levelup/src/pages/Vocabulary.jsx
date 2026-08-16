import { useState, useEffect, useRef } from "react";

import Layout from "../components/layout/Layout";
import Flashcard from "../components/study/Flashcard";

import lessons from "../data/lessons";
import { completeActivity } from "../services/activities";

function Vocabulary() {
  const lesson = lessons[0];

  const vocabulary = lesson.vocabulary;

  const [index, setIndex] = useState(0);
  const [awarding, setAwarding] = useState(true);

  // Antes: terminar a lição só mostrava "+150 XP" na tela — nada era
  // gravado no Supabase (sem XP real, sem streak, sem histórico). O ref
  // evita conceder XP duas vezes (ex: StrictMode do React roda efeitos
  // duas vezes em desenvolvimento).
  const awardedRef = useRef(false);

  const finished = index >= vocabulary.length;

  useEffect(() => {
    if (!finished || awardedRef.current) return;

    awardedRef.current = true;
    setAwarding(true);

    completeActivity("vocabulary", lesson.xp, `lesson:${lesson.id}`)
      .then((result) => {
        if (result.error) {
          console.error("Erro ao concluir vocabulário:", result.error);
        }
      })
      .finally(() => setAwarding(false));
  }, [finished, lesson.id, lesson.xp]);

  function nextWord() {
    if (index < vocabulary.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(vocabulary.length);
    }
  }

  if (finished) {
    return (
      <Layout>
        <div className="flashcard">
          <h1>🎉 Lição concluída!</h1>

          <p>
            Você concluiu o vocabulário da lição:
          </p>

          <h2 style={{ color: "#60a5fa" }}>
            {lesson.title}
          </h2>

          <p>
            Continue estudando para completar o Listening,
            Reading, Grammar e conversar com o Tutor IA.
          </p>

          <h2
            style={{
              color: "#22c55e",
              marginTop: "20px",
            }}
          >
            {awarding ? "Salvando..." : `+${lesson.xp} XP`}
          </h2>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div
        style={{
          marginBottom: "30px",
        }}
      >
        <h1 style={{ color: "white" }}>
          📖 Vocabulary
        </h1>

        <p
          style={{
            color: "#94a3b8",
            marginTop: "10px",
          }}
        >
          Lição: {lesson.title}
        </p>

        <p
          style={{
            color: "#22c55e",
            marginTop: "5px",
          }}
        >
          Nível: {lesson.level} • Recompensa: +{lesson.xp} XP
        </p>
      </div>

      <Flashcard
        word={vocabulary[index]}
        current={index}
        total={vocabulary.length}
        onNext={nextWord}
      />
    </Layout>
  );
}

export default Vocabulary;
