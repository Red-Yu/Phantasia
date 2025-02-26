<template>
  <div class="InfoData">
    <div class="titleGroup">
      <span class="icon-feather"></span>
      <h4>{{ info.title }}</h4>
    </div>
    <p class="infoContent">{{ info.content }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  info: {
    type: Object,
    required: true,
  },
});
</script>
