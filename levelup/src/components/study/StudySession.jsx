import { useState } from "react";

import "../../styles/studysession.css";

const steps = [
  {
    id: 1,
    title: "Vocabulary",
    description: "Aprenda 10 palavras novas.",
    icon: "📖",
  },
  {
    id: 2,
    title: "Listening",
    description: "Ouça um áudio curto.",
    icon: "🎧",
  },
  {
    id: 3,
    title: "Reading",
    description: "Leia um texto em inglês.",
    icon: "📚",
  },
  {
    id: 4,
    title: "Grammar",
    description: "Estude Simple Present.",
    icon: "✍️",
  },
  {
    id: 5,
    title: "Tutor IA",
    description: "Converse sobre o conteúdo.",
    icon: "🤖",
  },
];

function StudySession() {
  const [currentStep, setCurrentStep] = useState(0);

  const activity = steps[currentStep];

  function nextStep() {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  }

  return (
    <div className="study-session">
      <h2>
        Sessão {currentStep + 1} de {steps.length}
      </h2>

      <div className="session-card">
        <h1>{activity.icon}</h1>

        <h2>{activity.title}</h2>

        <p>{activity.description}</p>

        <button onClick={nextStep}>
          {currentStep === steps.length - 1
            ? "Finalizar"
            : "Concluir e Continuar"}
        </button>
      </div>

      <div className="progress-dots">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={
              index <= currentStep
                ? "dot active"
                : "dot"
            }
          />
        ))}
      </div>
    </div>
  );
}

export default StudySession;