import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from './router'
import 'ant-design-vue/dist/antd.css'
import * as antIcons from '@ant-design/icons-vue'

const app = createApp(App)
const antIconsList: any = antIcons

// 注册图标组件
for (const i in antIcons) {
  app.component(i, antIconsList[i])
}
app.config.globalProperties.$antIcons = antIcons // 挂在到vue实例上

app.use(router).mount('#app')
