<template>
  <div class="Header">
    <div class="headerLayout day" v-if="type === 'day'">
      <div class="logoGroup" @click="backToHome">
        <img src="../Assets/img/Logo_Stars.png" class="logo stars" />
        <img src="../Assets/img/Logo_Book.png" class="logo book" />
        <img src="../Assets/img/Logo_Text.png" class="logo text" />
        <div class="textMaskBox"></div>
      </div>

      <div class="slogan">
        <h4>Reading is more than words</h4>
      </div>

      <menu class="menuBtn">
        <!-- <OpenCloseButton type="hamburger" color="dark" /> -->
        <BookMenu></BookMenu>
      </menu>
    </div>

    <div class="headerLayout night" v-else>
      <div class="logoGroup" @click="backToHome">
        <img src="../Assets/img/Logo_Stars.png" class="logo stars" />
        <img src="../Assets/img/Logo_Book.png" class="logo book" />
        <img src="../Assets/img/Logo_Text.png" class="logo text" />
        <div class="textMaskBox"></div>
      </div>

      <div class="slogan">
        <h4>Reading is more than words</h4>
      </div>

      <menu class="menuBtn">
        <!-- <OpenCloseButton type="hamburger" color="light" /> -->
        <BookMenuNight></BookMenuNight>
      </menu>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import OpenCloseButton from "./BTN/OpenCloseButton.vue";
import BookMenu from "./BookMenu.vue";
import BookMenuNight from "./BookMenuNight.vue";
// -----------------------
//
// -----------------------
const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => ["day", "night"].includes(value),
  },
});
// -----------------------
// logo back to homepage
// -----------------------
const router = useRouter();
const backToHome = () => {
  setTimeout(() => {
    router.push("/");
  }, 375);
};
</script>
