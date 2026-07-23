import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../components/layout/Layout";
import StatsCards from "../components/dashboard/StatsCards";
import DailyMissions from "../components/dashboard/DailyMissions";
import ProgressBar from "../components/ProgressBar";
import TaskForm from "../components/TaskForm";

import calculateLevel from "../utils/calculateLevel";

import { useProfile } from "../hooks/useProfile";
import { useTasks } from "../hooks/useTasks";

import { updateTask, createTask } from "../services/tasks";
import { updateXP } from "../services/xp";

function Dashboard() {
  const navigate = useNavigate();

  const { profile, loading } = useProfile();

  const {
    tasks,
    setTasks,
    loading: loadingTasks,
    reloadTasks,
  } = useTasks();

  const [xp, setXp] = useState(0);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (profile) {
      setXp(profile.xp);
    }
  }, [profile]);

  if (loading || loadingTasks) {
    return (
      <Layout>
        <h2>Carregando...</h2>
      </Layout>
    );
  }

  const level = calculateLevel(xp);

  const progress = Math.min(
    Number(((xp / 1000) * 100).toFixed(1)),
    100
  );

  async function toggleTask(id) {
    const task = tasks.find((t) => t.id === id);

    if (!task) return;

    const completed = !task.done;

    const { error } = await updateTask(id, {
      done: completed,
    });

    if (error) {
      console.error(error);
      return;
    }

    const updatedTasks = tasks.map((t) =>
      t.id === id
        ? {
            ...t,
            done: completed,
          }
        : t
    );

    setTasks(updatedTasks);

    const newXP = completed
      ? xp + task.xp
      : xp - task.xp;

    setXp(newXP);

    const result = await updateXP(newXP);

    if (result.error) {
      console.error(result.error);
    }
  }

  async function handleCreateTask(task) {
    const { error } = await createTask(
      task.title,
      task.description,
      task.xp
    );

    if (error) {
      console.error(error);
      return;
    }

    setShowForm(false);

    reloadTasks();
  }

  return (
    <Layout>
      <StatsCards
        xp={xp}
        level={level}
        streak={profile?.streak ?? 0}
        hours={profile?.study_hours ?? 0}
      />

      <ProgressBar progress={progress} />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "30px 0",
          gap: "15px",
          flexWrap: "wrap",
        }}
      >
        <button onClick={() => setShowForm(true)}>
          ➕ Nova Missão
        </button>

        <button onClick={() => navigate("/study")}>
          🤖 Estudar Agora
        </button>
      </div>

      {showForm && (
        <TaskForm
          onSave={handleCreateTask}
          onCancel={() => setShowForm(false)}
        />
      )}

      <DailyMissions
        tasks={tasks}
        toggleTask={toggleTask}
      />
    </Layout>
  );
}

export default Dashboard;