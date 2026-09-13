import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "./assets/main.css"

import vue3GoogleLogin from "vue3-google-login"

const app = createApp(App)

app.use(router)

app.use(vue3GoogleLogin, {
    clientId: "882940930891-civns95juvot511h26l0bv894o5ra5h9.apps.googleusercontent.com"
})

app.mount("#app")