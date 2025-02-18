<script setup>
import { useRoute } from "vue-router";
const route = useRoute();

const props = defineProps({
  text: String,
  to: String, // Vue Router 導向的路由
});

// 判斷當前路由是否與按鈕的 `to` 一致
const isActive = () => route.path === props.to;
</script>

<template>
  <div class="btnTab" :class="{ active: isActive() }">
    <router-link :to="to" class="text">
      <p>{{ text }}</p>
    </router-link>

    <div class="tab-cross">
      <div class="cols">
        <span></span>
        <span></span>
      </div>
      <div class="rows">
        <span></span>
      </div>
    </div>
  </div>
</template>
