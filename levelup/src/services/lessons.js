import { supabase } from "./supabase";

export async function getCurrentLesson(userId) {
  return await supabase
    .from("user_lessons")
    .select("*")
    .eq("user_id", userId)
    .order("lesson_id", { ascending: true })
    .limit(1)
    .single();
}

export async function getUserLessons(userId) {
  return await supabase
    .from("user_lessons")
    .select("*")
    .eq("user_id", userId)
    .order("lesson_id", { ascending: true });
}

export async function updateLesson(id, values) {
  return await supabase
    .from("user_lessons")
    .update(values)
    .eq("id", id)
    .select()
    .single();
}

export async function unlockLesson(userId, lessonId) {
  return await supabase
    .from("user_lessons")
    .upsert(
      {
        user_id: userId,
        lesson_id: lessonId,
        unlocked: true,
      },
      {
        onConflict: "user_id,lesson_id",
      }
    )
    .select()
    .single();
}

export async function completeLesson(id) {
  return await supabase
    .from("user_lessons")
    .update({
      completed: true,
      progress: 100,
    })
    .eq("id", id)
    .select()
    .single();
}