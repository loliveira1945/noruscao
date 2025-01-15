import { processGame } from './proccesGame';

export async function gamesAll() {
  const API_URL = "https://webwidgets.365scores.com/web/games/current/?appTypeId=8&langId=31&timezoneName=America/Sao_Paulo&competitors=1270&includeTopBettingOpportunity=1";

  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (data.games && data.games.length > 0) {
      data.games.shift();
      
      const processedGames = data.games.map(game => processGame(game));
      return processedGames;
    }

    return null; // Nenhum jogo encontrado
  } catch (error) {
    console.error("Erro ao buscar os jogos:", error);
    throw error;
  }
}
