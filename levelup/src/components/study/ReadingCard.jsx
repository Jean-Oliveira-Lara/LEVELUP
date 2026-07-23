import "../../styles/reading.css";

function ReadingCard({ reading }) {
  return (
    <div className="reading-card">
      <h2>{reading.title}</h2>

      <span className="reading-level">
        {reading.level}
      </span>

      <p className="reading-time">
        ⏱ {reading.estimatedTime}
      </p>

      <div className="reading-text">
        {reading.text}
      </div>
    </div>
  );
}

export default ReadingCard;