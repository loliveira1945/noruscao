import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

window.addEventListener('load', () => {
    setTimeout(() => {
        window.scrollTo(0, 1);
    }, 0);
});