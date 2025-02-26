import "./Assets/css/global.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

// import Parallax from "parallax-js";

import App from "./App.vue";
import router from "./router";
// import $ from "jquery";

if (typeof window !== "undefined") {
  window.$ = $;
  window.jQuery = $;
}

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
