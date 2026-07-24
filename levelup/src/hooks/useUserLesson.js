import { useEffect, useState } from "react";

import { supabase } from "../services/supabase";

export function useLesson() {
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLessons();
  }, []);

  async function loadLessons() {
    setLoading(true);

    const { data, error } = await supabase
      .from("lessons")
      .select("*")
      .eq("is_active", true)
      .order("position", { ascending: true });

    if (error) {
      console.error("Erro ao carregar lições:", error);
      setLoading(false);
      return;
    }

    setLessons(data);

    if (data.length > 0) {
      setCurrentLesson(data[0]);
    }

    setLoading(false);
  }

  function getLessonById(id) {
    return lessons.find((lesson) => lesson.id === id);
  }

  return {
    lessons,
    lesson: currentLesson,
    currentLesson,
    loading,
    reloadLessons: loadLessons,
    getLessonById,
  };
}