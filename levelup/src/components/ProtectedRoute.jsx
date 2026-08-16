import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { supabase } from "../services/supabase";

// Antes desta correção, o App.jsx não verificava sessão nenhuma:
// qualquer pessoa podia digitar /dashboard, /profile, /statistics etc.
// diretamente na URL sem estar logada. Este componente resolve isso.
function ProtectedRoute({ children }) {
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!isMounted) return;
      setAuthenticated(!!session);
      setChecking(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setAuthenticated(!!session);
      }
    );

    return () => {
      isMounted = false;
      listener?.subscription?.unsubscribe();
    };
  }, []);

  if (checking) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#94a3b8",
          background: "#0f172a",
        }}
      >
        Carregando...
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
