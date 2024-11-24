import { createApp } from 'vue'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'
import 'normalize.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import 'element-plus/dist/index.css'
const app = createApp(App)

// 创建并使用 Pinia store
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
// 使用路由
app.use(router)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')
