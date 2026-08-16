import { useNavigate } from "react-router-dom";

import "../../styles/currentlesson.css";

function CurrentLesson({ lesson }) {
  const navigate = useNavigate();

  if (!lesson) {
    return null;
  }

  const progress = lesson.progress ?? 0;

  return (
    <div className="current-lesson">
      <h2>📚 Continue sua Lição</h2>

      <h3>{lesson.title}</h3>

      <p>{lesson.description}</p>

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
        onClick={() =>
          navigate(`/study/${lesson.lesson_id ?? lesson.id}`)
        }
      >
        ▶ Continuar estudando
      </button>
    </div>
  );
}

export default CurrentLesson;