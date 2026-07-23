import "../../styles/dailygoal.css";

function DailyGoal() {
  const goals = [
    { id: 1, title: "Vocabulary", done: true },
    { id: 2, title: "Reading", done: false },
    { id: 3, title: "Listening", done: false },
    { id: 4, title: "Grammar", done: false },
    { id: 5, title: "Speaking", done: false },
  ];

  return (
    <div className="daily-goal">
      <h2>🎯 Meta Diária</h2>

      {goals.map((goal) => (
        <div className="goal-item" key={goal.id}>
          <span>{goal.done ? "✅" : "⬜"}</span>

          <p>{goal.title}</p>
        </div>
      ))}
    </div>
  );
}

export default DailyGoal;