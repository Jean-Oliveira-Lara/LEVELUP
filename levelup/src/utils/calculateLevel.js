// Sistema de níveis do LevelUp.
// Cada nível exige mais XP que o anterior (curva simples e previsível).
// Nível N começa em XP_PER_LEVEL * (N - 1) e termina em XP_PER_LEVEL * N.
const XP_PER_LEVEL = 200;

export function calculateLevel(xp) {
  const safeXp = Math.max(0, Number(xp) || 0);
  return Math.floor(safeXp / XP_PER_LEVEL) + 1;
}

// XP necessário para alcançar um determinado nível.
export function xpForLevel(level) {
  return (level - 1) * XP_PER_LEVEL;
}

// Progresso (0-100) dentro do nível atual, já arredondado para
// evitar valores como "25.0000001%".
export function getLevelProgress(xp) {
  const safeXp = Math.max(0, Number(xp) || 0);
  const level = calculateLevel(safeXp);
  const currentLevelXp = safeXp - xpForLevel(level);

  const progress = Math.min(
    Number(((currentLevelXp / XP_PER_LEVEL) * 100).toFixed(1)),
    100
  );

  return {
    level,
    xpIntoLevel: currentLevelXp,
    xpForNextLevel: XP_PER_LEVEL,
    xpRemaining: Math.max(XP_PER_LEVEL - currentLevelXp, 0),
    progress,
  };
}

// Mantido como export default para compatibilidade com código existente
// que importa `calculateLevel` como default.
export default calculateLevel;
