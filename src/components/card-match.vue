<template>
  <div class="card-match">
    <div class="game" v-if="game">
      <div class="game-header">
        <p>{{ game.roundName }} {{ game.roundNum }}</p>
        <p>{{ formatTime(game.startTime) }}</p>
      </div>
      <p class="game-time">{{ game.gameTimeDisplayToShow }}</p>
      <div class="game-content">
        {{ game.symbolicHomeTeam }}
        <img 
          v-if="game.homeTeamImage" 
          class="game-shield" 
          :src="game.homeTeamImage" 
          :alt="game.homeCompetitor?.name || 'Time da casa desconhecido'" 
        />
        <h1>{{ game.homeScore }}</h1>
        <h1 style="font-size: 24px;">X</h1>
        <h1>{{ game.awayScore }}</h1>
        <img 
          v-if="game.awayTeamImage" 
          class="game-shield" 
          :src="game.awayTeamImage" 
          :alt="game.awayCompetitor?.name || 'Time visitante desconhecido'" 
        />
        {{ game.symbolicAwayTeam }}
      </div>
      <div class="game-footer">
        <hr style="width: 30%; background-color: #ccc;" />
        <p class="game-status">{{ game.statusText }}</p>
        <hr style="width: 30%; background-color: #ccc;" />
      </div>
      <div class="game-info">
        <div class="game-red-card-left red-card" v-html="game.redCardElementHome"></div>
        <div class="game-red-card-right red-card" v-html="game.redCardElementAway"></div>
      </div>
      <p class="game-location">Local: {{ game.venue }}</p>
    </div>
    <div v-else>
      <p>Nenhum jogo encontrado.</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { fetchGame } from "@/services/gameService";
import { rulesGame } from "@/services/rulesGame";
import { formatTime } from "@/services/timeFormatter";

export default {
  name: "CardMatch",
  setup() {
    const game = ref(null);
    let interval = null;

    const updateGame = async () => {
      try {
        const fetchedGame = await fetchGame();
        if (fetchedGame) {
          const processedGame = rulesGame(fetchedGame);
          game.value = {
            ...processedGame,
            homeTeamImage: `https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v1/Competitors/${fetchedGame.idHome}`,
            awayTeamImage: `https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v1/Competitors/${fetchedGame.idAway}`,
          };
        } else {
          game.value = null;
        }
      } catch (error) {
        console.error("Erro ao atualizar o jogo:", error);
        game.value = null;
      }
    };

    onMounted(() => {
      updateGame();
      interval = setInterval(updateGame, 30000);
    });

    onUnmounted(() => {
      clearInterval(interval);
    });

    return { game, updateGame, formatTime };
  },
};
</script>

<style scoped>
.card-match {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff; /*282828*/
  border-left: 7px solid #b60000;
  border-radius: .5rem;
  margin: 50px 10px 10px 10px;
  padding: 15px;
  font-weight: bold;
  text-align: left;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, 
              rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, 
              rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.game {
  width: 100%;
  height: 100%;
}

.game-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  padding: .5em 0 1em 0;
}

.game-time {
  display: flex;
  justify-content: center;
  font-size: 1.2em;
  font-weight: bold;
  color: #b60000;
  padding: 1em;
}

.game-shield {
  width: 40px;
  height: 40px;
  margin-right: .5em;
  padding: 0 0 2em 0;
}

.game-status {
  background-color: #b60000;
  border-radius: 7px;
  font-size: 1.1em;
  font-weight: bold;
  color: #fff; /*f39c12*/
  padding: .5em;
  margin: 0 10px;
  text-align: center;
}

.game-location {
  text-align: center;
  font-size: 1em;
  color: #ccc;
  padding: 1em 0 0 0;
}

.game-content {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.game-footer {
  width: 100%;
  display: flex;
  align-items: center;
}

.game-info {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.game-red-card-right {
  width: 20%;
  display: flex;
  justify-content: flex-end;
}

.game-red-card-left {
  width: 20%;
  display: flex;
  justify-content: flex-start;
}

.red-card {
  width: 20px;
  height: 20px;
}
</style>
