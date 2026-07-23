import { CheckCircle2, Circle, Star } from "lucide-react";
import { motion } from "framer-motion";

import "../../styles/dailymissions.css";

function DailyMissions({ tasks, toggleTask }) {
  return (
    <div className="missions-card">
      <div className="missions-header">
        <h2>🎯 Missões de Hoje</h2>

        <span>{tasks.length} missões</span>
      </div>

      <div className="missions-list">
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            whileHover={{ scale: 1.02 }}
            className={`mission ${task.done ? "completed" : ""}`}
          >
            <button
              className="check-button"
              onClick={() => toggleTask(task.id)}
            >
              {task.done ? (
                <CheckCircle2 size={24} />
              ) : (
                <Circle size={24} />
              )}
            </button>

            <div className="mission-info">
              <h3>{task.title}</h3>

              <p>{task.description}</p>
            </div>

            <div className="mission-xp">
              <Star size={18} />
              {task.xp} XP
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default DailyMissions;