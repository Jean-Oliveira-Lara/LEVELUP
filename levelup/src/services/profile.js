import { supabase } from "./supabase";

export async function getProfile() {
  // Obtém o usuário autenticado
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    console.error("Erro ao obter usuário:", authError);

    return {
      data: null,
      error: authError,
    };
  }

  if (!user) {
    console.error("Nenhum usuário autenticado.");

    return {
      data: null,
      error: {
        message: "Usuário não autenticado.",
      },
    };
  }

  // Busca o perfil do usuário
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Erro ao buscar perfil:");
    console.log("Código:", error.code);
    console.log("Mensagem:", error.message);
    console.log("Detalhes:", error.details);
    console.log("Hint:", error.hint);
    console.log(error);

    return {
      data: null,
      error,
    };
  }

  console.log("Perfil encontrado:");
  console.log(data);

  return {
    data,
    error: null,
  };
}

export async function updateProfile(values) {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      data: null,
      error: authError || {
        message: "Usuário não autenticado.",
      },
    };
  }

  const { data, error } = await supabase
    .from("profiles")
    .update(values)
    .eq("id", user.id)
    .select()
    .single();

  return {
    data,
    error,
  };
}