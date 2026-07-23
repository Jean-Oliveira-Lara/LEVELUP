import { useEffect, useState } from "react";
import { getProfile } from "../services/profile";

export function useProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      const { data, error } = await getProfile();

      if (error) {
        console.error(error);
      } else {
        setProfile(data);
      }

      setLoading(false);
    }

    loadProfile();
  }, []);

  return {
    profile,
    loading,
  };
}