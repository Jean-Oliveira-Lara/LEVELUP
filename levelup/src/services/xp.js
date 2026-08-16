import { supabase } from "./supabase";
import { calculateLevel } from "../utils/calculateLevel";

// Define um valor absoluto de XP para o perfil do usuário logado.
// Usa a MESMA fórmula de nível (calculateLevel) usada no restante do app,
// evitando a inconsistência que existia entre xp.js e utils/calculateLevel.js.
export async function updateXP(newXP) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Usuário não encontrado." };
  }

  const safeXP = Math.max(0, Math.round(newXP));
  const level = calculateLevel(safeXP);

  const { data, error } = await supabase
    .from("profiles")
    .update({
      xp: safeXP,
      level,
    })
    .eq("id", user.id)
    .select()
    .single();

  return { data, error };
}

// Adiciona XP de forma incremental (usado por missões/atividades).
// Sempre lê o XP atual do banco antes de somar, evitando "corridas" onde
// duas telas com estado desatualizado sobrescrevem o XP uma da outra.
export async function awardXP(amount) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Usuário não encontrado." };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("xp")
    .eq("id", user.id)
    .single();

  if (profileError) {
    return { error: profileError };
  }

  const newXP = Math.max(0, (profile?.xp ?? 0) + amount);

  return await updateXP(newXP);
}
