import { useEffect, useState } from "react";

import { supabase } from "../services/supabase";

// Hook único para lições (antes existiam DOIS hooks diferentes,
// useLesson.js e useUserLesson.js, ambos exportando uma função chamada
// `useLesson`. As páginas Study.jsx e Lessons.jsx importavam de
// "../hooks/useLesson" esperando `lessons` e `getLessonById`, mas esse
// arquivo só retornava uma única lição sem essas propriedades — por isso
// o `getLessonById` era `undefined` e a tela ficava branca ao abrir uma
// lição. Este arquivo agora concentra toda a lógica.
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
      .order("position", { ascending: true });

    if (error) {
      console.error("Erro ao carregar lições:", error);
      setLessons([]);
      setCurrentLesson(null);
      setLoading(false);
      return;
    }

    const list = data || [];
    setLessons(list);
    setCurrentLesson(list.length > 0 ? list[0] : null);
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
    reloadLesson: loadLessons,
    reloadLessons: loadLessons,
    getLessonById,
  };
}
