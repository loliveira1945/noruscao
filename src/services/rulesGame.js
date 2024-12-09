export function rulesGame(game) {
    let gameTimeDisplayToShow = game.gameTime;

    if (['Programação', 'Intervalo', 'Fim'].includes(game.statusText)) {
      gameTimeDisplayToShow = '';  // Remove o tempo
    } else if (game.statusText === 'Segundo Tempo') {
      gameTimeDisplayToShow = `${game.gameTime}`; // Exibe o tempo
    }

    const redCardElementHome = game.redCardHome > 0 
      ? Array.from({ length: game.redCardHome }, () => '<img class="red-card" src="./img/red-card.921f57cc.png">').join('') 
      : '';
  
    const redCardElementAway = game.redCardAway > 0 
      ? Array.from({ length: game.redCardAway }, () => '<img class="red-card" src="./img/red-card.921f57cc.png">').join('')  
      : '';
  
    return {
      ...game,
      gameTimeDisplayToShow, // Atualiza com o tempo modificado conforme as regras
      redCardElementHome,    // Cartões vermelhos do time da casa
      redCardElementAway,    // Cartões vermelhos do time visitante
    };
  }
  