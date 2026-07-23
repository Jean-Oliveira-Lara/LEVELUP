import "./StudyCard.css";

function StudyCard({
  icon,
  title,
 description,
  color,
  onClick,
}) {
  return (
    <div
      className="study-card"
      onClick={onClick}
      style={{
        borderLeft: `6px solid ${color}`,
      }}
    >
      <div className="study-icon">
        {icon}
      </div>

      <div className="study-info">
        <h2>{title}</h2>

        <p>{description}</p>
      </div>

      <div className="study-arrow">
        →
      </div>
    </div>
  );
}

export default StudyCard;