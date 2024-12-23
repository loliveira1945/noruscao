import { fetchGame } from "@/services/gameService";

export async function fetchPlayer() {    
    try {
        const gameData = await fetchGame();
        
        if (gameData) {
            const { idGame, idHome, idAway } = gameData;

            const API_URL = `https://webws.365scores.com/web/game/?appTypeId=5&langId=31&timezoneName=America/Sao_Paulo&userCountryId=21&gameId=${idGame}&topBookmaker=161`;

            const response = await fetch(API_URL);
            const data = await response.json();
    
            let playerDetailsHome = [];
            let playerDetailsAway = [];
            
            if (data.game && data.game.events && data.game.members) {
                data.game.events.forEach(event => {
                    if (event.eventType && event.eventType.id === 1) {
                        const matchingMember = data.game.members.find(member => member.id === event.playerId);
                        const playerName = matchingMember ? matchingMember.shortName : "Jogador não identificado";
                        const gameTime = event.gameTime || "Tempo não disponível";

                        if (event.competitorId === idHome) {
                            playerDetailsHome.push({ playerNameHome: playerName, gameTimeHome: gameTime });
                        } else if (event.competitorId === idAway) {
                            playerDetailsAway.push({ playerNameAway: playerName, gameTimeAway: gameTime });
                        }
                    }
                });

                return { playerDetailsHome, playerDetailsAway };
            } else {
                console.log("Nenhum evento encontrado.");
            }
        } else {
            console.log("Nenhum jogo encontrado.");
        }
    } catch (error) {
        console.error("Erro ao processar os dados:", error);
    }
}
