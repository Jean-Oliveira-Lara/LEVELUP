import { useState } from "react";

function ReadingQuiz({ reading, onFinish }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);

  const question = reading.questions[questionIndex];

  function nextQuestion() {
    let newScore = score;

    if (selected === question.answer) {
      newScore++;
      setScore(newScore);
    }

    if (questionIndex < reading.questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setSelected(null);
    } else {
      onFinish(newScore);
    }
  }

  return (
    <div className="reading-card">
      <h2>
        Pergunta {questionIndex + 1} de {reading.questions.length}
      </h2>

      <h3
        style={{
          color: "white",
          marginTop: "20px",
        }}
      >
        {question.question}
      </h3>

      <div
        style={{
          marginTop: "30px",
        }}
      >
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => setSelected(index)}
            style={{
              width: "100%",
              textAlign: "left",
              marginBottom: "12px",
              padding: "15px",
              borderRadius: "10px",
              border:
                selected === index
                  ? "2px solid #3b82f6"
                  : "1px solid #334155",
              background: "#1e293b",
              color: "white",
              cursor: "pointer",
            }}
          >
            {option}
          </button>
        ))}
      </div>

      <button
        style={{
          marginTop: "25px",
        }}
        disabled={selected === null}
        onClick={nextQuestion}
      >
        {questionIndex === reading.questions.length - 1
          ? "Finalizar"
          : "Próxima"}
      </button>
    </div>
  );
}

export default ReadingQuiz;