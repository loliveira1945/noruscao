<template>
  <h1 class="game-title">PRÓXIMOS JOGOS:</h1>
  <div v-for="game in games" :key="game.id" class="card-match">
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
    <p class="game-location">Local: {{ game.venue }}</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

import { gamesAll } from '../services/gamesAll';
import { formatTime } from "@/services/timeFormatter";
import { fetchPlayer } from "@/services/playerService";

export default {
  setup() {
    const games = ref([]);

    onMounted(async () => {
      try {
        const fetchedGames = await gamesAll();
        games.value = fetchedGames;
      } catch (error) {
        console.error("Erro ao carregar jogos:", error);
      }
    });

    return {
      games,
      formatTime,
      fetchPlayer,
    };
  },
};
</script>

<style scoped>
.game-title {
  font-size: 24px;
  font-weight: bold;
  padding-top: 7vh;
}
</style>