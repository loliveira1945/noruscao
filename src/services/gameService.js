import { processGame } from './proccesGame';

export async function fetchGame() {
  const API_URL = "https://webwidgets.365scores.com/web/games/current/?appTypeId=8&langId=31&timezoneName=America/Sao_Paulo&competitors=1270&includeTopBettingOpportunity=1";
  
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (data.games && data.games[0]) {
      return processGame(data.games[0]);
    }

    return null;
  } catch (error) {
    console.error("Erro ao buscar o jogo:", error);
    throw error;
  }
}
