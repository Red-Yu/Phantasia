<template>
  <div class="modal-overlay" v-if="isVisible" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="FullScreenModalBgc"></div>
      <div class="btn-close" @click="closeModal">
        <OpenCloseButton type="plus" color="dark" />
      </div>
      <!-- mainContent -->
      <div class="mainContent CreateNewProject">
        <div class="project"></div>
        
        <input type="text" v-model="projectName" placeholder="Enter project name" />
        
        <div class="btnKey-M dark" @click="createProject">
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useTemplateStore } from "@/stores/template";
import router from "../../../router";
import OpenCloseButton from "../../../components/BTN/OpenCloseButton.vue";

// 使用 Pinia store
const templateStore = useTemplateStore();
// =================
// 彈窗開關
// =================
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
// =================
// 點擊 CREATE 按鈕後
// =================
const projectName = ref("");  // 定義專案名稱

const createProject = () => {
  templateStore.resetTemplates();
  
  if (projectName.value.trim()) {  // 檢查名稱是否非空
    templateStore.setStoryName(projectName.value);  // 儲存專案名稱
    router.push("/Create");  // 跳轉到創建頁面
  } else {
    alert("Please enter a project name!");  // 如果名稱為空，顯示提示
  }
};
</script>

<style scoped></style>
