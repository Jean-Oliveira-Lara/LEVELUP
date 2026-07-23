import "../../styles/achievement.css";

function AchievementCard() {
  const achievements = [
    "🥇 Primeira Lição",
    "🔥 7 dias seguidos",
    "⭐ 100 XP",
  ];

  return (
    <div className="achievement-card">
      <h2>🏆 Conquistas</h2>

      {achievements.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </div>
  );
}

export default AchievementCard;