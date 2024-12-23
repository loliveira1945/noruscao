<template>
  <div class="card-match">
    <div class="game" v-if="game">
      <div class="game-header">
        <p>{{ game.roundName }} {{ game.roundNum }}</p>
        <p>{{ formatTime(game.startTime) }}</p>
      </div>
      <p class="game-time">
        {{ game.gameTimeDisplayToShow }}
        <span class="game-time-minute" v-if="game.gameTimeDisplayToShow">'</span>
      </p>
      <div class="game-content">
        {{ game.symbolicHomeTeam }}
        <div class="game-team">
          <img 
            v-if="game.homeTeamImage" 
            class="game-shield" 
            :src="game.homeTeamImage" 
            :alt="game.homeCompetitor?.name || 'Time da casa desconhecido'" 
          />
        </div>
        <h1 class="game-content-score">{{ game.homeScore }}</h1>
        <h1 class="game-content-score">X</h1>
        <h1 class="game-content-score">{{ game.awayScore }}</h1>
        <div class="game-team">
          <img 
            v-if="game.awayTeamImage" 
            class="game-shield" 
            :src="game.awayTeamImage" 
            :alt="game.awayCompetitor?.name || 'Time visitante desconhecido'" 
          />
        </div>
        {{ game.symbolicAwayTeam }}
      </div>
      <div class="game-footer">
        <hr style="width: 30%; background-color: #ccc;" />
        <p class="game-status">{{ game.statusText }}</p>
        <hr style="width: 30%; background-color: #ccc;" />
      </div>
      <div class="game-info">
        <pre>{{ player.value }}</pre>
        <div class="game-info-header">
          <div v-if="player?.playerDetailsHome.length">
            <div v-for="(playerDetailHome, index) in player.playerDetailsHome" :key="index" class="game-goal-home">
              <font-awesome-icon :icon="['far', 'futbol']" class="game-item-goal"/>
              {{ playerDetailHome.playerNameHome }} - {{ playerDetailHome.gameTimeHome }}'
            </div>
          </div>
          <div v-if="player?.playerDetailsAway.length">
            <div v-for="(playerDetailAway, index) in player.playerDetailsAway" :key="index" class="game-goal-away">
              <font-awesome-icon :icon="['far', 'futbol']" class="game-item-goal"/>
              {{ playerDetailAway.playerNameAway }} - {{ playerDetailAway.gameTimeAway }}'
            </div>
          </div>
        </div>
        <div class="game-info-footer">
          <div class="game-item-left game-item-red-card" v-html="game.redCardElementHome"></div>
          <div class="game-item-right game-item-red-card" v-html="game.redCardElementAway"></div>
        </div>
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
import { fetchPlayer } from "@/services/playerService";

export default {
  name: "CardMatch",

  setup() {
    const gameHasGoals = ref(false);

    const player = ref({ playerDetailsHome: [], playerDetailsAway: [] });
    let intervalPlayer = null;

    const updatePlayer = async () => {
      try {
        const fetchedPlayer = await fetchPlayer();
        if (fetchedPlayer) {
          player.value = { ...fetchedPlayer };
        } else {
          player.value = { playerDetailsHome: [], playerDetailsAway: [] };
        }
      } catch (error) {
        console.error("Erro ao atualizar jogadores:", error);
        player.value = { playerDetailsHome: [], playerDetailsAway: [] };
      }
    };

    const game = ref(null);
    let intervalGame = null;

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

          if (fetchedGame.homeScore > 0 || fetchedGame.awayScore > 0) {
            if (!gameHasGoals.value) {
              gameHasGoals.value = true;
              await updatePlayer();
            }
          }
        } else {
          game.value = null;
        }
      } catch (error) {
        console.error("Erro ao atualizar o jogo:", error);
        game.value = null;
      }
    };

    onMounted(async () => {
      await updateGame();
      intervalGame = setInterval(updateGame, 30000);

      if (gameHasGoals.value) {
        intervalPlayer = setInterval(updatePlayer, 30000);
      }
    });

    onUnmounted(() => {
      clearInterval(intervalGame);
      clearInterval(intervalPlayer);
    });

    return { game, player, updateGame, updatePlayer, formatTime };
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
.game-team{
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.game-shield {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
}

.game-status {
  background-color: #b60000;
  border-radius: 7px;
  font-size: 1.1em;
  font-weight: bold;
  color: #fff;
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
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  padding: 0 0 2em 0;
}

.game-content-score {
  font-size: 1.7em;
}

.game-footer {
  width: 100%;
  display: flex;
  align-items: center;
}

.game-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
}

.game-info-header {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}

.game-info-footer {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}

.game-item-right {
  width: 20%;
  display: flex;
  justify-content: flex-end;
}

.game-item-left {
  width: 20%;
  display: flex;
  justify-content: flex-start;
}

.game-item-red-card, .game-item-goal {
  width: 20px;
  height: 20px;
  margin: 0 .5em;
}

.game-item-goal{
  color: #767676
}

.game-goal-home, .game-goal-away{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: .25em 0;
}

.game-time-minute {
  font-size: 1.2em;
  color: #b60000;
  animation: blink 1s infinite;
  transform: translateY(-0.2em);
}

@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
