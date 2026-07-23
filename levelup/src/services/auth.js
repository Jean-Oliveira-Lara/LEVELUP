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
    const { error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: data.user.id,
        name,
        xp: 0,
        streak: 0,
        level: 1,
        study_hours: 0,
      });

    if (profileError) {
      console.error(profileError);
    }
  }

  return { data, error };
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
}

export async function signOut() {
  await supabase.auth.signOut();
}

export async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}