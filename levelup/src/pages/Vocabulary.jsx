import { useState } from "react";

import Layout from "../components/layout/Layout";
import Flashcard from "../components/study/Flashcard";

import lessons from "../data/lessons";

function Vocabulary() {
  const lesson = lessons[0];

  const vocabulary = lesson.vocabulary;

  const [index, setIndex] = useState(0);

  const finished = index >= vocabulary.length;

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
            +{lesson.xp} XP
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