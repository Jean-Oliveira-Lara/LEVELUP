import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../components/layout/Layout";
import StatsCards from "../components/dashboard/StatsCards";
import DailyMissions from "../components/dashboard/DailyMissions";
import CurrentLesson from "../components/dashboard/CurrentLesson";
import DailyGoal from "../components/dashboard/DailyGoal";
import AchievementCard from "../components/dashboard/AchievementCard";

import ProgressBar from "../components/ProgressBar";
import TaskForm from "../components/TaskForm";

import { calculateLevel, getLevelProgress } from "../utils/calculateLevel";

import { useProfile } from "../hooks/useProfile";
import { useTasks } from "../hooks/useTasks";
import { useLesson } from "../hooks/useLesson";

import { updateTask, createTask, ensureDailyMissions } from "../services/tasks";
import { awardXP } from "../services/xp";
import { completeActivity } from "../services/activities";

function Dashboard() {
  const navigate = useNavigate();

  const { profile, loading, reloadProfile } = useProfile();

  const {
    tasks,
    setTasks,
    loading: loadingTasks,
    reloadTasks,
  } = useTasks();

  const {
    lesson,
    loading: lessonLoading,
  } = useLesson();

  const [xp, setXp] = useState(0);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (profile) {
      setXp(profile.xp);
    }
  }, [profile]);

  // Gera as missões diárias de inglês na primeira vez que o Dashboard
  // carrega no dia. ensureDailyMissions() é idempotente: só insere se
  // ainda não existir nenhuma missão automática para hoje, então é
  // seguro chamar toda vez que o Dashboard monta.
  useEffect(() => {
    async function setupDailyMissions() {
      const { created } = await ensureDailyMissions();

      if (created) {
        await reloadTasks();
      }
    }

    setupDailyMissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || loadingTasks || lessonLoading) {
    return (
      <Layout>
        <h2>Carregando...</h2>
      </Layout>
    );
  }

  const level = calculateLevel(xp);

  // Antes: progress = min((xp/1000)*100, 100) — um único "teto" fixo de
  // 1000 XP para sempre, sem relação com o nível atual (depois do nível 5
  // a barra travava em 100% para sempre). Mantemos o mesmo cuidado de
  // arredondamento (evitar "25.0000001%"), mas o progresso agora é
  // relativo ao nível atual do usuário.
  const { progress } = getLevelProgress(xp);

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

    if (completed) {
      // Concluir a missão: soma XP, atualiza streak e registra no
      // histórico de atividades (tudo em um lugar só, via completeActivity).
      const result = await completeActivity(
        task.type || "task",
        task.xp,
        `task:${id}`
      );

      if (result.error) {
        console.error(result.error);
      }

      if (result.profile) {
        setXp(result.profile.xp);
      }

      await reloadProfile();
    } else {
      // Desmarcar a missão: apenas devolve o XP. A streak/histórico do dia
      // não são desfeitos (evita punir o usuário por um clique acidental).
      const result = await awardXP(-task.xp);

      if (result.error) {
        console.error(result.error);
      }

      if (result.data) {
        setXp(result.data.xp);
      }

      await reloadProfile();
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

    await reloadTasks();
  }

  return (
    <Layout>
      <div
        style={{
          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            color: "white",
            fontSize: "34px",
            marginBottom: "8px",
          }}
        >
          👋 Olá, {profile?.name || "Aluno"}
        </h1>

        <p
          style={{
            color: "#94a3b8",
            fontSize: "17px",
          }}
        >
          Continue aprendendo inglês hoje.
        </p>
      </div>

      <StatsCards
        xp={xp}
        level={level}
        streak={profile?.streak ?? 0}
        hours={profile?.study_hours ?? 0}
      />

      <ProgressBar progress={progress} />

      <div
        onClick={() => navigate("/lessons")}
        style={{
          cursor: "pointer",
          marginBottom: "25px",
        }}
      >
        <CurrentLesson lesson={lesson} />
      </div>

      <DailyGoal />

      <AchievementCard />

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

        <button onClick={() => navigate("/lessons")}>
          📚 Ver Todas as Lições
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