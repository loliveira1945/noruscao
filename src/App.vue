<template>
  <header>
    <img src="./assets/logo-noruscao.png" alt="NoruscaÔ logo" class="logo-noruscao">

  </header>
  <main>
    <card-match />
    <hr class="division">
    <div class="buttons-container">
        <button-container @click="openURL('https://noroeste.eusoutorcedor.com.br/seja_socio.php')">
            Seja Sócio Noroeste
        </button-container>
        <button-container @click="openURL('https://www.rruniformes.com.br/noroeste')">
            Adquira sua camisa
        </button-container>
    </div>
    <hr class="division">
  </main>
  <footer>
      <div class="footer-container-social">
        <icon-footer @click="openURL('https://www.linkedin.com/in/lucasalvesoliveira2042')">
          <Linkedin />
        </icon-footer>
        <icon-footer @click="openURL('https://github.com/loliveira1945')">
          <Github />
        </icon-footer>
      </div>
      <p>Todos os direitos reservados © e desenvolvido por Lucas Alves Oliveira.</p>
  </footer>
</template>

<script>
import cardMatch from './components/card-match.vue';
import buttonContainer from './components/button-container.vue';
import iconFooter from './components/icon-footer.vue'
import { Linkedin, Github } from 'lucide-vue-next';

export default {
  name: 'App',

  methods: {
    openURL(url, target = '_blank') {
      window.open(url, target);
    }
  },

  components: {
    cardMatch,
    buttonContainer,
    iconFooter,
    Linkedin,
    Github
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

.logo-noruscao{
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
}

.footer-container-social {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 1.2em 0;
}
</style>
