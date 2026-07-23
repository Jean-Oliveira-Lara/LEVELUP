import { Clock, BookOpen, Headphones, BookText, PenTool } from "lucide-react";

import "../../styles/studyplan.css";

function StudyPlan() {
  const activities = [
    {
      icon: <BookOpen size={20} />,
      title: "Vocabulary",
      description: "Aprender 10 palavras",
    },
    {
      icon: <Headphones size={20} />,
      title: "Listening",
      description: "Ouvir um áudio",
    },
    {
      icon: <BookText size={20} />,
      title: "Reading",
      description: "Ler um texto curto",
    },
    {
      icon: <PenTool size={20} />,
      title: "Grammar",
      description: "Simple Present",
    },
  ];

  return (
    <div className="study-plan">
      <h2>🤖 Plano de Estudos</h2>

      <p>
        Hoje você estudará:
      </p>

      <div className="activities">
        {activities.map((activity) => (
          <div
            key={activity.title}
            className="activity"
          >
            {activity.icon}

            <div>
              <strong>{activity.title}</strong>

              <span>{activity.description}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="study-time">
        <Clock size={18} />

        <span>Tempo estimado: 25 minutos</span>
      </div>

      <button className="start-button">
        Começar Sessão
      </button>
    </div>
  );
}

export default StudyPlan;