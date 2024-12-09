export function rulesGame(game) {
    let gameTimeDisplayToShow = game.gameTimeDisplay;
  
    // Se o jogo está no Intervalo, oculta o tempo
    if (game.statusText === 'Intervalo') {
      gameTimeDisplayToShow = '';
    }
  
    // Se o jogo acabou, não precisa continuar a contagem do tempo
    if (game.statusText === 'Fim') {
      gameTimeDisplayToShow = '';
    }
  
    // Se o jogo está no Segundo Tempo
    if (game.statusText === 'Segundo Tempo') {
      gameTimeDisplayToShow = `${game.gameTimeDisplay}`;
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
  