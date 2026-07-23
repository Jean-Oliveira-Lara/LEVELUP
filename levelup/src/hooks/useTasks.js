import { useEffect, useState } from "react";
import { getTasks } from "../services/tasks";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadTasks() {
    setLoading(true);

    const { data, error } = await getTasks();

    if (error) {
      console.error(error);
    } else {
      setTasks(data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return {
    tasks,
    setTasks,
    loading,
    reloadTasks: loadTasks,
  };
}