<template>

  <header>
    <img src="./assets/logo-noruscao.png" alt="NoruscaÔ logo" class="logo-noruscao">
  </header>
  <main>

    <transition name="fade-card-match">
      <card-match v-if="moduleViewGame" />
    </transition>

    <transition name="fade-list-matches">
      <list-matches v-if="!moduleViewGame" />
    </transition>

    <hr class="division">
    
    <div class="buttons-container">
      <button-container @click="openURL('https://noroeste.eusoutorcedor.com.br/seja_socio.php')">
          Seja Sócio Noroeste
      </button-container>
      <button-container @click="openURL('https://www.rruniformes.com.br/noroeste')">
          Adquira sua camisa
      </button-container>
      <button-container @click="changeViewGame" v-if="moduleViewGame">
          Ver Jogos
      </button-container>
      <button-container @click="changeViewGame" v-if="!moduleViewGame">
          Jogo Atual
      </button-container>
    </div>
    
    <hr class="division">

    <p class="sponsor-title">Patrocinadores:</p>
    <swiper
      :spaceBetween="30"
      :centeredSlides="true"
      :autoplay="{
        delay: 2000,
        disableOnInteraction: false,
      }"
      :loop="true"
      :slidesPerView="3"
      :modules="modules"
      class="mySwiper"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
    <swiper-slide v-for="(sponsor, index) in sponsors" :key="index">
      <img class="sponsor" :src="require(`@/assets/${sponsor.logo}`)" :alt="sponsor.nome" />
    </swiper-slide>
    </swiper>

  </main>

  <footer class="footer-container">
      <p>Todos os direitos reservados © e desenvolvido por 
        <a class="footer-dev" href="https://www.linkedin.com/in/lucasalvesoliveira2042" target="_blank">Lucas Alves Oliveira</a>.
      </p>
  </footer>

</template>

<script>
import cardMatch from './components/card-match.vue';
import buttonContainer from './components/button-container.vue';
import listMatches from './components/list-matches.vue';

import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import sponsors from '@/assets/sponsors.json';

export default {
  name: 'App',

  data(){
    return {
      moduleViewGame: true,
    };
  },

  setup() {
    return {
      sponsors,
      modules: [Autoplay],
    };
  },

  methods: {
    openURL(url, target = '_blank') {
      window.open(url, target);
    },

    changeViewGame() {
      return this.moduleViewGame = !this.moduleViewGame
    }
  },

  components: {
    cardMatch,
    buttonContainer,
    listMatches,
    Swiper,
    SwiperSlide,
  }
}
</script>

<style>
@import './assets/style/reset.css';
@import './assets/style/layout.css';

#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #b60000;
  background-color: #fcfcfc;
  min-height: 100vh;
}

.logo-noruscao {
  max-width: 100%;
  height: auto;
}

.division {
  width: 80vw;
  margin-top: 1em;
}

.buttons-container {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin: 1em .5em .5em .5em;
}

.footer-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin-top: 2em;
}

.footer-dev {
  color: #b60000;
}

.sponsor {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.sponsor-title {
  font-weight: bold;
  padding-bottom: 3vh;
}

.fade-card-match-enter-active, .fade-card-match-leave-active {
  transition: opacity .5s ease;
}

.fade-list-matches-enter-active, .fade-list-matches-leave-active {
  transition: opacity 1s ease;
}

.fade-list-matches-enter-from, .fade-list-matches-leave-to, .fade-card-match-enter-from, .fade-card-match-leave-to {
  opacity: 0;
}

.fade-list-matches-enter-to, .fade-list-matches-leave-from, .fade-card-match-enter-to, .fade-card-match-leave-from {
  opacity: 1;
}

</style>
