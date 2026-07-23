import { useNavigate } from "react-router-dom";

import "../../styles/currentlesson.css";

function CurrentLesson() {

  const navigate = useNavigate();

  const progress = 40;

  return (

    <div className="current-lesson">

      <h2>📚 Continue sua Lição</h2>

      <h3>Daily Routine</h3>

      <p>
        Complete Vocabulary, Reading,
        Listening, Grammar e Speaking.
      </p>

      <div className="lesson-progress-bar">

        <div
          className="lesson-progress-fill"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

      <p className="lesson-progress-text">

        {progress}% concluído

      </p>

      <button
        onClick={() => navigate("/study")}
      >
        ▶ Continuar estudando
      </button>

    </div>

  );

}

export default CurrentLesson;