import { createApp } from 'vue'
import App from './App.vue'
import router from '../router/index.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import {createPinia} from "pinia";

const pinia = createPinia()

const app = createApp(App);
app.use(router)
app.use(pinia)

app.config.globalProperties.$pinia = pinia

app.mount('#app');