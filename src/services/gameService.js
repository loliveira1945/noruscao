export async function fetchGame() {
    const API_URL = "https://webwidgets.365scores.com/web/games/current/?appTypeId=8&langId=31&timezoneName=America/Sao_Paulo&competitors=1270&includeTopBettingOpportunity=1";//1222 //1270
  
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (data.games && data.games[0]) {
        const game = data.games[0];

        return {
          idHome: game.homeCompetitor.id,
          idAway: game.awayCompetitor.id,
          homeTeam: game.homeCompetitor?.name || "Time da casa desconhecido",
          awayTeam: game.awayCompetitor?.name || "Time visitante desconhecido",
          homeScore: game.homeCompetitor && game.homeCompetitor.score !== undefined
                      ? (game.homeCompetitor.score === -1 
                      ? '' 
                      : game.homeCompetitor.score)
                      : '0',
          awayScore: game.awayCompetitor && game.awayCompetitor.score !== undefined
                      ? (game.awayCompetitor.score === -1 
                      ? '' 
                      : game.awayCompetitor.score)
                      : '0',
          startTime: game.startTime,
          statusText: game.statusText || "Status não disponível",
          gameTime: game.gameTime || "",
          venue: game.venue?.name || "Local não disponível",
          roundName: game.roundName,
          roundNum: game.roundNum,
          symbolicHomeTeam: game.homeCompetitor.symbolicName || game.homeCompetitor.longName,
          symbolicAwayTeam: game.awayCompetitor.symbolicName || game.awayCompetitor.longName,
          homeTeamImage: `https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v1/Competitors/${game.homeCompetitor.id}`,
          awayTeamImage: `https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v1/Competitors/${game.awayCompetitor.id}`,
          redCardHome: game.homeCompetitor.redCards,
          redCardAway: game.awayCompetitor.redCards,
          idGame: game.id
        };
      }
  
      return null; // Nenhum jogo encontrado
    } catch (error) {
      console.error("Erro ao buscar o jogo:", error);
      throw error;
    }
}
