import { useEffect, useState } from "react";

import { supabase } from "../services/supabase";

export function useLesson() {
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLesson();
  }, []);

  async function loadLesson() {
    const {
      data,
      error,
    } = await supabase
      .from("lessons")
      .select("*")
      .order("position")
      .limit(1)
      .single();

    if (error) {
      console.error(error);
    } else {
      setLesson(data);
    }

    setLoading(false);
  }

  return {
    lesson,
    loading,
    reloadLesson: loadLesson,
  };
}