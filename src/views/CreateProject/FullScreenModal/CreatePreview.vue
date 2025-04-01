<template>
  <div class="modal-overlay" v-if="isVisible" @click="closeModal">
    <div class="modal-content" ref="scrollContainerRef" @click.stop>
      <div class="FullScreenModalBgc"></div>
      <!-- 模組顯示主區塊 -->
      <div class="mainContent" ref="mainContentRef">  
        <div class="CreatePreviewGroup" :style="getPreviewStyle">
          <div class="modelBox">
            <div
              class="modelPreview"
              v-for="(template, i) in templateStore.templates"
              :key="template.data.templateId"
              :ref="el => modelRefs[i] = el"
              style="pointer-events: none;"
            >
              <component
                :is="template.component"        
                v-bind="template.data"          
                :mode="currentMode"                    
                @updateData="updateTemplateData(i, $event)" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref ,watch ,nextTick } from "vue";
import { useElementSize } from "@vueuse/core";
import { useTemplateStore } from "@/stores/template";

// =================
// 外部傳入的屬性
// =================
const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
  modalId: {
    type: String,
    required: true,
  },
})

// =================
// 彈窗開關邏輯
// =================
const emit = defineEmits(["close"]); // 宣告可觸發的事件

// 彈窗關閉時觸發事件
const closeModal = () => {
  emit("close");
};

// =================
// Pinia 狀態 + 預覽動畫模式切換
// =================
const templateStore = useTemplateStore(); // 取得模板資料 store
const scrollContainerRef = ref(null); // 指向預覽區域（作為 IntersectionObserver 的 root）
const currentMode = ref('preview'); // 預設模式為預覽

// 根據彈窗開關切換當前模式
watch(
  () => props.isVisible,
  (visible) => {
    if (visible) {
      currentMode.value = 'preview';

      // 等 DOM 完成後手動啟動 observer（確保能正確觀察 DOM）
      nextTick(() => {
        setupObserver();
      });
    } else {
      currentMode.value = 'edit';
      // console.log('彈窗關閉 → 回到 edit 模式');
    }
  },
  { immediate: true }
);

// =================
// 模板縮放邏輯（根據容器寬度進行等比縮放）
// =================
const mainContentRef = ref(null); // 預覽主區塊容器
const { width } = useElementSize(mainContentRef); // 動態監聽容器寬度變化

const baseWidth = 680; // 設計稿的寬度基準

// 計算 scale 並應用 transform（讓預覽區在各裝置上縮放）
const getPreviewStyle = computed(() => {
  const scale = Math.min(width.value / baseWidth);
  return {
    transform: `scale(${scale})`,
    transformOrigin: "top",
  };
});

// =================
// IntersectionObserver 設定：模組進入畫面時觸發動畫
// =================
const modelRefs = ref([]); // 收集所有模組區塊的 DOM 參考

function setupObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        const el = entry.target;

        if (entry.isIntersecting) {
          // 每次模組進入視窗就呼叫動畫方法（允許多次播放）
          el.__startInnerAnimation?.();
          // console.log('發出動畫觸發指令：', el);
        }
      });
    },
    {
      root: scrollContainerRef.value, // 設定滾動容器作為 root，僅觀察其內部可視區域
      threshold: 0.5, // 當元素有一半進入畫面時即觸發
    }
  );

  // 對每個模組進行觀察（不取消觀察，確保每次進入都能觸發）
  modelRefs.value.forEach(el => {
    if (el) observer.observe(el);
  });
}
</script>
