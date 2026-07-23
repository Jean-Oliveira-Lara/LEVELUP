import {
  Home,
  Target,
  Brain,
  BookOpen,
  Headphones,
  Mic,
  BookText,
  BarChart3,
  User,
  Settings
} from "lucide-react";

import { Link } from "react-router-dom";

import "../../styles/sidebar.css";

function Sidebar() {
  const menu = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: Target, label: "Missões", path: "/missions" },
    { icon: Brain, label: "Tutor IA", path: "/study" },
    { icon: BookOpen, label: "Vocabulário", path: "/vocabulary" },
    { icon: Headphones, label: "Listening", path: "/listening" },
    { icon: Mic, label: "Speaking", path: "/speaking" },
    { icon: BookText, label: "Reading", path: "/reading" },
    { icon: BarChart3, label: "Estatísticas", path: "/statistics" },
    { icon: User, label: "Perfil", path: "/profile" },
    { icon: Settings, label: "Configurações", path: "/settings" }
  ];

  return (
    <aside className="sidebar">
      <h2 className="logo">
        🇺🇸 LevelUp
      </h2>

      <nav>
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              to={item.path}
              className="menu-item"
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;