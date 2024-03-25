import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
axios.defaults.baseURL = 'https://113.56.214.46:33529'

const app = createApp(App)
app.use(router)
app.use(Antd)
app.mount('#app')