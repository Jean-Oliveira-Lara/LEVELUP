import { useEffect, useState } from "react";
import { getProfile } from "../services/profile";

export function useProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const { data, error } = await getProfile();

        if (error) {
          console.error("Erro ao carregar perfil:", error);
          setProfile(null);
        } else {
          setProfile(data);
        }
      } catch (err) {
        console.error("Erro inesperado:", err);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  return {
    profile,
    loading,
    reloadProfile: async () => {
      const { data } = await getProfile();
      setProfile(data);
    },
  };
}