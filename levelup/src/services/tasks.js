import { supabase } from "./supabase";

const DEFAULT_DAILY_MISSIONS = [
  {
    title: "Aprender 10 palavras novas",
    description: "Complete a atividade de Vocabulary de hoje.",
    xp: 20,
    type: "vocabulary",
  },
  {
    title: "Fazer uma leitura em inglês",
    description: "Leia o texto do dia e responda as perguntas.",
    xp: 25,
    type: "reading",
  },
  {
    title: "Praticar listening",
    description: "Ouça o áudio do dia e responda as perguntas.",
    xp: 25,
    type: "listening",
  },
  {
    title: "Revisar palavras antigas",
    description: "Reveja o vocabulário de lições anteriores.",
    xp: 15,
    type: "vocabulary",
  },
];

function todayString() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

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

// Garante que o usuário tenha as missões diárias de inglês no dia de hoje.
// Só insere se ainda não existir nenhuma missão automática ('type' !=
// 'custom') com mission_date = hoje — assim não duplica a cada reload
// nem some com as tarefas criadas manualmente pelo próprio usuário.
export async function ensureDailyMissions() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Usuário não encontrado" };
  }

  const today = todayString();

  const { data: existing, error: checkError } = await supabase
    .from("tasks")
    .select("id")
    .eq("user_id", user.id)
    .eq("mission_date", today)
    .neq("type", "custom");

  if (checkError) {
    return { error: checkError };
  }

  if (existing && existing.length > 0) {
    return { data: existing, created: false };
  }

  const rows = DEFAULT_DAILY_MISSIONS.map((mission) => ({
    user_id: user.id,
    title: mission.title,
    description: mission.description,
    xp: mission.xp,
    type: mission.type,
    mission_date: today,
    done: false,
  }));

  const { data, error } = await supabase.from("tasks").insert(rows).select();

  return { data, error, created: true };
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
    type: "custom",
    mission_date: todayString(),
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