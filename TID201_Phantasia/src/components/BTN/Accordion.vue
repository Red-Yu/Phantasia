<template>
  <div class="Accordion">
    <div class="btnTab" @click="toggle" :class="{ active: isOpen }">
      <p class="text">{{ title }}</p>
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
    <!-- 內容 -->
    <div v-if="isOpen" class="accordionContent">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  title: String,
});

const isOpen = ref(false);

const toggle = () => {
  isOpen.value = !isOpen.value;
};
</script>
