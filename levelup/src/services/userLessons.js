import { supabase } from "./supabase";

export async function getUserLesson(userId) {
  return await supabase
    .from("user_lessons")
    .select("*")
    .eq("user_id", userId)
    .single();
}

export async function updateUserLesson(id, values) {
  return await supabase
    .from("user_lessons")
    .update(values)
    .eq("id", id);
}

export async function createUserLesson(userId, lessonId) {
  return await supabase
    .from("user_lessons")
    .insert({
      user_id: userId,
      lesson_id: lessonId,
    });
}