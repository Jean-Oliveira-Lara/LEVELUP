function TaskList({ tasks, toggleTask }) {
  return (
    <div className="tasks">
      <h2>Tarefas de Hoje</h2>

      {tasks.map((task) => (
        <label key={task.id}>
          <input
            type="checkbox"
            checked={task.done}
            onChange={() => toggleTask(task.id)}
          />

          {" "}

          {task.title}

          <span style={{ color: "#3b82f6" }}>
            {" "}
            (+{task.xp} XP)
          </span>
        </label>
      ))}
    </div>
  );
}

export default TaskList;