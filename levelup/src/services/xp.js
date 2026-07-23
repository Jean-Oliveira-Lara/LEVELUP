import { supabase } from "./supabase";

export async function updateXP(newXP) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Usuário não encontrado." };
  }

  const level = Math.floor(newXP / 100) + 1;

  const { data, error } = await supabase
    .from("profiles")
    .update({
      xp: newXP,
      level,
    })
    .eq("id", user.id)
    .select()
    .single();

  return { data, error };
}