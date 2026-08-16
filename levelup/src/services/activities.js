import { supabase } from "./supabase";
import { awardXP } from "./xp";
import { registerStudyActivity } from "./streak";

// Ponto único de entrada para "o usuário concluiu uma atividade de inglês".
// Toda tela de estudo (Vocabulary, Reading, Listening, Writing, Speaking,
// missões diárias) deve chamar esta função ao terminar, em vez de mexer
// direto em XP/streak. Isso evita lógica duplicada e espalhada, e garante
// que toda conclusão fica registrada para as Estatísticas (Etapa 8).
//
// activityType: 'vocabulary' | 'reading' | 'listening' | 'writing' | 'speaking' | 'task'
// xpAmount: quanto de XP essa atividade vale
// source: identificador opcional, ex: 'lesson:1', 'reading:1', 'task:<id>'
export async function completeActivity(activityType, xpAmount, source = null) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Usuário não encontrado." };
  }

  const [xpResult, streakResult] = await Promise.all([
    awardXP(xpAmount),
    registerStudyActivity(),
  ]);

  if (xpResult.error) {
    console.error("Erro ao conceder XP:", xpResult.error);
  }

  if (streakResult.error) {
    console.error("Erro ao atualizar streak:", streakResult.error);
  }

  const { error: logError } = await supabase.from("activity_completions").insert({
    user_id: user.id,
    activity_type: activityType,
    xp_earned: xpAmount,
    source,
  });

  if (logError) {
    console.error("Erro ao registrar atividade:", logError);
  }

  return {
    profile: xpResult.data,
    streak: streakResult.data,
    error: xpResult.error || streakResult.error || logError || null,
  };
}
