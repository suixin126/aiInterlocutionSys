import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 1. 引入组件库
import ElementPlus from 'element-plus'
// 2. 引入组件库样式
import 'element-plus/dist/index.css'

createApp(App)
.use(router)
.use(ElementPlus)
.mount('#app')
