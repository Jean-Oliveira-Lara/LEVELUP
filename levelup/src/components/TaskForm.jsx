import { useState } from "react";

function TaskForm({ onSave, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [xp, setXp] = useState(20);

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) return;

    onSave({
      title,
      description,
      xp: Number(xp),
    });

    setTitle("");
    setDescription("");
    setXp(20);
  }

  return (
    <div className="task-form">
      <h2>Nova Tarefa</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          min="1"
          value={xp}
          onChange={(e) => setXp(e.target.value)}
        />

        <div className="buttons">
          <button type="button" onClick={onCancel}>
            Cancelar
          </button>

          <button type="submit">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;