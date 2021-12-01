import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

// /api/registerにリクエスト飛ばすためのやつ
axios.defaults.baseURL = 'http://localhost:80/api/'
axios.defaults.withCredentials = true

createApp(App).use(store).use(router).mount('#app')

const loginCheck = async () => {
    if (localStorage.isLogin == "true") {
        try {
            const userData = await axios.get(axios.defaults.baseURL + "user")
            localStorage.displayName = await userData.data.display_name as string
            localStorage.userID      = await userData.data.user_id as string
            localStorage.grade       = await userData.data.Grade as string
            localStorage.email       = await userData.data.email as string
            localStorage.isLogin     = true
            store.dispatch("setAuth", true)
        } catch (e) {
            localStorage.displayName = null
            localStorage.userID      = null
            localStorage.grade       = null
            localStorage.email       = null
            localStorage.isLogin     = false
            store.dispatch("setAuth", false)
        }
    } else {
        localStorage.displayName = null
        localStorage.userID      = null
        localStorage.grade       = null
        localStorage.email       = null
        localStorage.isLogin     = false
        store.dispatch("setAuth", false)
    }
}

loginCheck()