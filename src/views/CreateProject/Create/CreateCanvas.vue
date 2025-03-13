<template>
  <div class="CreateCanvas">
    <!-- FunctionBar -->
    <div class="FunctionBar">
      <div class="Zoom">
        <span class="btn" @click="zoomOut">-</span>
        <span> {{ zoomLevel }}% </span>
        <span class="btn" @click="zoomIn">+</span>
      </div>
      <div class="stepGroup">
        <div class="step">
          <div class="last"></div>
        </div>
        <div class="step">
          <div class="next"></div>
        </div>
      </div>
    </div>
    <!-- Canvas Group，綁定縮放 -->
    <div
      class="canvasGroup"
      :style="{
        transform: `scale(${zoomLevel / 100})`,
        transformOrigin: 'top center',
      }"
    >
      <div class="canvas" v-for="(template, i) in templateStore.templates" :key="i">
        <component :is="template" />
      </div>
      <!-- BTN - saveCanvas -->
      <router-link to="./Create/CreateInfo">
        <div class="saveCanvas">
          <div class="btnKey-M dark-border">
            <p>SAVE</p>
            <!-- cross (icon) :內層 class 同上(內部還有其他元素不要掉了)-->
            <div class="icon-M">
              <div class="dark-cross">
                <div class="cols">
                  <span></span>
                  <span></span>
                </div>
                <div class="rows">
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { throttle } from "lodash";
// 引入 template store
import { useTemplateStore } from "@/stores/template";

// 使用 Pinia store
const templateStore = useTemplateStore();

// =================
// 縮放比例
// =================
const zoomLevel = ref(100);
// 放大
const zoomIn = throttle(() => {
  if (zoomLevel.value < 150) zoomLevel.value += 10;
}, 1000);
// 縮小
const zoomOut = throttle(() => {
  if (zoomLevel.value > 50) zoomLevel.value -= 10;
}, 1000);
</script>
