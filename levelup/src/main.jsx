import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./styles/global.css";
import "./styles/dashboard.css";

// O UserContext antigo foi removido: ele guardava um usuário FALSO e fixo
// (name: "Jean", xp: 250...) que nenhuma página realmente usava — o app
// inteiro já busca o perfil real via useProfile()/Supabase. Manter os dois
// só criava confusão sobre qual era a fonte de verdade dos dados do usuário.

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
