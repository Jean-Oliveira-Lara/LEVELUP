import { supabase } from "./supabase";

export async function getTasks() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { data: [], error: "Usuário não encontrado" };
  }

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true });

  return { data, error };
}

export async function createTask(title, description, xp = 10) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return await supabase.from("tasks").insert({
    user_id: user.id,
    title,
    description,
    xp,
    done: false,
  });
}

export async function updateTask(id, values) {
  return await supabase
    .from("tasks")
    .update(values)
    .eq("id", id);
}

export async function deleteTask(id) {
  return await supabase
    .from("tasks")
    .delete()
    .eq("id", id);
}