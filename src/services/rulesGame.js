export function rulesGame(game) {
    let gameTimeDisplayToShow = game.gameTime;

    if(['Programação'].includes(game.statusText)) {
      game.statusText = 'Em Breve';
    }

    if (['Em Breve', 'Intervalo', 'Fim', 'Recém-finalizado'].includes(game.statusText)) {
      gameTimeDisplayToShow = '';  // Remove o tempo
    } else if (game.statusText === 'Segundo Tempo') {
      gameTimeDisplayToShow = `${game.gameTime}`; // Exibe o tempo
    }

    const redCardElementHome = game.redCardHome > 0 
      ? Array.from({ length: game.redCardHome }, () => '<img class="red-card" src="https://imagecache.365scores.com/image/upload/f_svg,w_16,h_16,c_limit,q_auto:eco,dpr_1,d_EventTypes:light:3.svg/EventSubType/light/21">').join('')  
      : '';
  
    const redCardElementAway = game.redCardAway > 0 
      ? Array.from({ length: game.redCardAway }, () => '<img class="red-card" src="https://imagecache.365scores.com/image/upload/f_svg,w_16,h_16,c_limit,q_auto:eco,dpr_1,d_EventTypes:light:3.svg/EventSubType/light/21">').join('')  
      : '';
  
    return {
      ...game,
      gameTimeDisplayToShow, // Atualiza com o tempo modificado conforme as regras
      redCardElementHome,    // Cartões vermelhos do time da casa
      redCardElementAway,    // Cartões vermelhos do time visitante
    };
  }
  