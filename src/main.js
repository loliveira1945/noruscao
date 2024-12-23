import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { faFutbol } from '@fortawesome/free-regular-svg-icons';

library.add(faFutbol);

import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');