import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import Wallet from './plugins/wallet.js'
import './assets/base.css'

const app = createApp(App)

app.use(router)
app.use(Wallet)

app.mount('#app')
