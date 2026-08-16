import { supabase } from "./supabase";

function toDateString(date) {
  // YYYY-MM-DD no fuso local do navegador (evita bug de "virar o dia"
  // por causa de UTC quando o usuário está longe do fuso zero).
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Chame esta função sempre que o usuário concluir QUALQUER atividade de
// inglês (missão, vocabulário, reading, listening...). Ela:
// - não faz nada se o usuário já estudou hoje (evita contar 2x no mesmo dia);
// - soma +1 na streak se o último estudo foi ontem;
// - reinicia a streak em 1 se o usuário ficou mais de um dia sem estudar.
export async function registerStudyActivity() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Usuário não encontrado." };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("streak, last_study_date, study_hours")
    .eq("id", user.id)
    .single();

  if (profileError) {
    return { error: profileError };
  }

  const today = new Date();
  const todayStr = toDateString(today);

  if (profile.last_study_date === todayStr) {
    // Já estudou hoje — streak não muda.
    return { data: profile, error: null, unchanged: true };
  }

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = toDateString(yesterday);

  const newStreak =
    profile.last_study_date === yesterdayStr
      ? (profile.streak ?? 0) + 1
      : 1;

  const { data, error } = await supabase
    .from("profiles")
    .update({
      streak: newStreak,
      last_study_date: todayStr,
    })
    .eq("id", user.id)
    .select()
    .single();

  return { data, error };
}
