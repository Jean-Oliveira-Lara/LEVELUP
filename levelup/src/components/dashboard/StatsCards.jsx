import { Trophy, Flame, BookOpen, Star } from "lucide-react";

import "../../styles/statscards.css";

function StatsCards({ xp, level, streak, hours }) {
  const cards = [
    {
      title: "XP",
      value: xp,
      icon: <Star size={28} />,
    },
    {
      title: "Nível",
      value: level,
      icon: <Trophy size={28} />,
    },
    {
      title: "Sequência",
      value: `${streak} dias`,
      icon: <Flame size={28} />,
    },
    {
      title: "Horas",
      value: `${hours}h`,
      icon: <BookOpen size={28} />,
    },
  ];

  return (
    <div className="stats-grid">
      {cards.map((card) => (
        <div
          className="stats-card"
          key={card.title}
        >
          <div className="stats-icon">
            {card.icon}
          </div>

          <div>
            <span>{card.title}</span>

            <h2>{card.value}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;