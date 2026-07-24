import { supabase } from "./supabase";

export async function signUp(name, email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });

  if (error) {
    return { data, error };
  }

  if (data.user) {
    // Cria o perfil
    const { error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: data.user.id,
        name,
        xp: 0,
        level: 1,
        streak: 0,
        study_hours: 0,
      });

    if (profileError) {
      console.error("Erro ao criar perfil:", profileError);
      return { error: profileError };
    }

    // Desbloqueia a primeira lição
    const { error: lessonError } = await supabase
      .from("user_lessons")
      .insert({
        user_id: data.user.id,
        lesson_id: 1,
        unlocked: true,
        completed: false,
        progress: 0,
      });

    if (lessonError) {
      console.error("Erro ao criar primeira lição:", lessonError);
    }
  }

  return { data, error: null };
}

export async function signIn(email, password) {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
}

export async function signOut() {
  return await supabase.auth.signOut();
}

export async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}