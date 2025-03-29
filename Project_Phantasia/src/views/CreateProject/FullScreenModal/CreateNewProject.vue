<template>
  <div class="modal-overlay" v-if="isVisible" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="bgc"></div>
      <div class="btn-close" @click="closeModal">
        <OpenCloseButton type="plus" color="dark" />
      </div>
      <!-- mainContent -->
      <div class="mainContent CreateNewProject">
        <div class="project"></div>
        <input type="text" placeholder="Enter project name" />
        <router-link to="/Create">
          <div class="btnKey-M dark">
            <p>CREATE</p>
            <div class="icon-L">
              <div class="white-cross">
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
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from "../../../router";
import OpenCloseButton from "../../../components/BTN/OpenCloseButton.vue";

// 定義 props
const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
});

// 定義 emit 事件
const emit = defineEmits(["close"]);

// 關閉彈窗的方法
const closeModal = () => {
  emit("close");
};
</script>

<style scoped></style>
