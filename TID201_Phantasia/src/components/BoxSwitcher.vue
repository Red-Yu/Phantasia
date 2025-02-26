<template>
  <div id="boxContainer">
    <div
      v-for="box in boxes"
      :key="box.id"
      :id="box.id"
      class="box"
      :class="{ show: activeBox === box.id, hide: activeBox !== box.id }"
    >
      {{ box.name }}
    </div>
  </div>

  <button
    v-for="box in boxes"
    :key="box.id"
    class="toggleButton"
    @click="showBox(box.id)"
  >
    顯示 {{ box.name }}
  </button>
</template>

<script setup>
// 定義組件的 reactive 資料
import { ref } from "vue";

const boxes = ref([
  { id: "box1", name: "Box 1" },
  { id: "box2", name: "Box 2" },
  { id: "box3", name: "Box 3" },
]);

const activeBox = ref(null); // 存儲當前顯示的 box ID

// 顯示對應的 box
function showBox(boxId) {
  activeBox.value = boxId;
}
</script>

<style scoped>
/* 隱藏所有 box */
.box {
  opacity: 0;
  animation-duration: 1s;
  animation-fill-mode: forwards;
}

/* 進場動畫 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* 退場動畫 */
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

/* 顯示 box 時的樣式 */
.box.show {
  display: block;
  animation: fadeIn 1s forwards;
}

/* 隱藏 box 時的樣式 */
.box.hide {
  animation: fadeOut 1s forwards;
}
</style>
