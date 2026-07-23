import { supabase } from "./supabase";

export async function getCurrentLesson(userId) {
  return await supabase
    .from("user_lessons")
    .select("*")
    .eq("user_id", userId)
    .order("lesson_id")
    .limit(1)
    .single();
}

export async function updateLesson(id, values) {
  return await supabase
    .from("user_lessons")
    .update(values)
    .eq("id", id);
}