import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

const app=createApp(App)
app.use(store)
app.use(router)
app.use(VXETable)
app.mount('#app')