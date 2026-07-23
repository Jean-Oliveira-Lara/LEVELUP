import { useState } from "react";
import { Volume2, Star } from "lucide-react";

import "../../styles/flashcard.css";

function Flashcard({
  word,
  current,
  total,
  onNext,
}) {
  const [showAnswer, setShowAnswer] = useState(false);

  function speak() {
    const utterance = new SpeechSynthesisUtterance(
      word.english
    );

    utterance.lang = "en-US";

    speechSynthesis.speak(utterance);
  }

  const progress = ((current + 1) / total) * 100;

  return (
    <div className="flashcard">

      <div className="progress">

        <div
          className="progress-fill"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      <p className="progress-text">
        Palavra {current + 1} de {total}
      </p>

      <h1>{word.english}</h1>

      {!showAnswer ? (
        <>
          <button
            onClick={() =>
              setShowAnswer(true)
            }
          >
            Mostrar resposta
          </button>
        </>
      ) : (
        <>
          <h2>{word.portuguese}</h2>

          <p>{word.example}</p>

          <div className="flash-actions">

            <button onClick={speak}>
              <Volume2 size={18}/>
              Pronunciar
            </button>

            <button>
              <Star size={18}/>
              Favoritar
            </button>

          </div>

          <button
            className="next-button"
            onClick={()=>{
              setShowAnswer(false);
              onNext();
            }}
          >
            Próxima Palavra →
          </button>
        </>
      )}
    </div>
  );
}

export default Flashcard;