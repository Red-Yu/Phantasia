<template>
  <div class="modal-overlay" v-if="isVisible" @click="closeModal">
    <div class="modal-content" ref="scrollContainerRef" @click.stop>
      <div class="bgc"></div>
      <!-- mainContent -->
      <div class="mainContent" ref="mainContentRef">  
        <div class="CreatePreviewGroup" :style="getPreviewStyle">
          <div class="modelBox">
            <div
              class="modelPreview"
              v-for="(template, i) in templateStore.templates"
              :key="i"
              :ref="el => modelRefs[i] = el"
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
import { computed, ref ,watch ,nextTick,onMounted } from "vue";
import { useElementSize } from "@vueuse/core";
import { useTemplateStore } from "@/stores/template";
import { eventBus } from "@/utils/eventBus";

// 定義 props
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
// 彈窗開關
// =================
// 定義 emit 事件
const emit = defineEmits(["close"]);

// 關閉彈窗的方法
const closeModal = () => {
  emit("close");
};

// =================
// 使用 Pinia store + 判斷動畫啟動的方式
// =================
const templateStore = useTemplateStore();
const scrollContainerRef = ref(null);
const currentMode = ref('preview');
watch(
  () => props.isVisible,
  (visible) => {
    if (visible) {
      currentMode.value = 'preview';

      // 等 DOM 完成後手動啟動 observer
      nextTick(() => {
        setupObserver(); // 👈 把 observer 邏輯獨立成一個函數
      });
    } else {
      currentMode.value = 'edit';
      console.log('彈窗關閉 → 回到 edit 模式');
    }
  },
  { immediate: true }
);
// =================
// 模板等比縮放
// =================
const mainContentRef = ref(null); // 綁定外層容器
const { width } = useElementSize(mainContentRef); // 取得容器大小

const baseWidth = 680; // 設計稿基準寬度

const getPreviewStyle = computed(() => {
  const scale = Math.min(width.value / baseWidth);
  return {
    transform: `scale(${scale})`,
    transformOrigin: "top left",
  };
});

// =================================
const modelRefs = ref([]);

function setupObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        const el = entry.target;
        if (entry.isIntersecting && !el.dataset.animated) {
          el.dataset.animated = 'true';
          el.__startInnerAnimation?.();
          console.log('發出 .__startInnerAnimation?.();');
        }
      });
    },
    {
      root: scrollContainerRef.value,
      threshold: 0.5,
    }
  );

  modelRefs.value.forEach(el => {
    if (el) observer.observe(el);
  });
}


</script>
