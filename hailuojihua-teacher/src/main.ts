import { createApp } from 'vue'
import './style.css'
import router from './router';
import App from './App.vue'
import 'ant-design-vue/dist/reset.css';
import Antd from 'ant-design-vue';
import axios from 'axios';
axios.defaults.baseURL = 'xxxxxx'

const app = createApp(App)
app.use(Antd);
app.config.globalProperties.$http = axios

app.use(router);
app.mount('#app')