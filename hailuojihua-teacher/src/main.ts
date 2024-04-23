import { createApp } from 'vue'
import './style.css'
import router from './router';
import App from './App.vue'
import 'ant-design-vue/dist/reset.css';
import Antd from 'ant-design-vue';
import axios from 'axios';
import { createPinia } from 'pinia'
axios.defaults.baseURL = 'http://124.220.40.115:82'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(Antd);
app.config.globalProperties.$http = axios

app.use(router);
app.mount('#app')