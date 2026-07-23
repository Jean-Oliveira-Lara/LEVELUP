import "../../styles/lessonprogress.css";

function LessonProgress({ steps, currentStep }) {
  return (
    <div className="lesson-progress">
      {steps.map((step, index) => (
        <div
          key={step.id}
          className={
            index < currentStep
              ? "step completed"
              : index === currentStep
              ? "step current"
              : "step locked"
          }
        >
          <span>{step.icon}</span>

          <p>{step.title}</p>
        </div>
      ))}
    </div>
  );
}

export default LessonProgress;