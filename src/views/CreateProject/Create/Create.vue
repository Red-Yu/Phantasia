<style>
@import "../../../Assets/css/main.css";
</style>

<template>
  <div class="Create">
    <!-- 左邊-Function  -->
    <div class="CreateMenu Function" :class="{ close: isLeftClose }">
      <div class="stickyBar">
        <div class="FunctionBar">
          <div class="CheckBox">
            <!-- <CheckBox></CheckBox> -->
          </div>
          <span class="Toggle" @click="toggleFunction" />
        </div>
        <div class="bookInfoBox">
          <h1 class="title">{{ storyName.name ? `${storyName.name}` : " " }}</h1>
          <h3 class="subTitle">Drafts</h3>
        </div>
      </div>
      <div class="CreateMenuContent">
        <Accordion
          v-for="accordionItem in accordionItems"
          :key="accordionItem"
          :title="accordionItem.title"
        >
          <component :is="accordionItem.content" />
        </Accordion>
      </div>
    </div>
    <!-- 主要內容區域 -->
    <div class="main-content">
      <CreateCanvas />
    </div>
    <!-- 右側-PageView -->
    <div class="CreateMenu PageView" :class="{ close: isRightClose }">
      <div class="topBar">
        <span class="Toggle" @click="togglePageView" />
      </div>
      <div class="MenuContent">
        <div class="modelView" v-for="(template, i) in templateStore.templates" :key="i">
          <div class="modelContent">
            <!-- 顯示縮小版的 template -->
            <div class="canvasPreview" :style="getPreviewStyle()">
              <component
                :is="template.component"
                v-bind="template.data"
                mode="thumbnail"
                style="pointer-events:none;"
              />
              <button
                class="remove-btn"
                @click="removeTemplate(i)"
                :style="{ transform: 'scale(3.5)' }"
              >
                ×
              </button>
            </div>
          </div>
          <p>{{ i + 1 }}</p>
          <!-- 顯示遞增的編號 -->
        </div>
      </div>
      <div class="next-step-btn">
        <button class="PreviewBtn" @click="openModal">
          <div class="btnKey-M dark-border">
            <p>PREVIEW</p>
            <div class="icon-M">
              <div class="dark-view"></div>
            </div>
          </div>
        </button>
        <div class="save-btn-group">
          <div class="SaveDraftBtn"  @click="saveDraftTemplates">
            <div class="btnKey-M dark"  >
              <p>SAVE DRAFT</p>
              <div class="icon-M">
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
          <div class="SaveBtn" @click="saveTemplates">
            <div class="btnKey-M light" >
              <p>NEXT STEP</p>
              <div class="icon-M">
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
          </div >
        </div>
      </div>
    </div>

<!-- 這裡在測試 記得調整回來 !!!!!!!! -->

    <!-- 這個是對的 -->
    <CreatePreview :isVisible="isModalVisible" modalId="CreatePreview"  @close="closeModal" />
    
    
    <!-- 測試抓資料 -->
    <!-- <ProductsFinish :isVisible="isModalVisible" modalId="ProductsFinish"  @close="closeModal" /> -->
  
  
  
<!-- 這裡在測試 記得調整回來 !!!!!!!! -->
  
  
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useTemplateStore } from "@/stores/template";
import Accordion from "../../../components/BTN/Accordion.vue";
import AccordionTemplate from "../../../components/BTN/AccordionTemplate.vue";
import AccordionText from "../../../components/BTN/AccordionText.vue";
import CheckBox from "../../../components/Input/CheckBox.vue";
import CreateCanvas from "./CreateCanvas.vue";
import CreatePreview from "../FullScreenModal/CreatePreview.vue";


// 它是用來測試的 
import ProductsFinish from "../../../components/ProductsFinish.vue";

// 使用 Pinia store
const templateStore = useTemplateStore();

// ====================
// <!-- 左邊-Function  -->
// ====================
// 切換左側邊欄的收縮狀態
const toggleFunction = () => {
  isLeftClose.value = !isLeftClose.value;
};
// 左側邊欄的收縮狀態
const isLeftClose = ref(false);

// 左側邊欄的手風情內容
const accordionItems = ref([
  { title: "Template", content: AccordionTemplate },
  { title: "Text", content: AccordionText },
]);

// 叫出使用者創建的書名
const storyName = templateStore.storyName ;  // 獲取簡報名稱

// ====================
// 右側-PageView
// ====================
// 右側邊欄的收縮狀態
const isRightClose = ref(false);
// 切換右側邊欄的收縮狀態
const togglePageView = () => {
  isRightClose.value = !isRightClose.value;
};
// 用於縮放預覽樣式的函數
function getPreviewStyle() {
  return {
    transform: `scale(0.25)`, // 這裡調整縮放比例
    transformOrigin: "top left", // 縮放基準點，從左上角開始縮放
  };
}
// 刪除模板的函數
function removeTemplate(i) {
  templateStore.removeTemplate(i); // 通過 Pinia store 刪除對應的 template
}
// ==================
// preview 彈窗
// ==================
// components 初始狀態
const isModalVisible = ref(false);

// 打開彈窗的方法
const openModal = () => {
  isModalVisible.value = true;
};

// 關閉彈窗的方法
const closeModal = () => {
  isModalVisible.value = false;
};
// ==================
// 儲存功能的引用
// ==================
const router = useRouter();

// -----{{儲存進草稿資料夾}}
const saveDraftTemplates = async () => {
  // 提示用戶確認是否儲存模板
  try {
    await templateStore.saveDraftToFirebase(); // 調用儲存方法
    console.log("簡報已儲存！");
    router.push('/CreateProject');
  } catch (error) {
    console.error("儲存簡報時出現錯誤:", error);
  }
};

// -----{{確認儲存往下一步}}
const saveTemplates = async () => {
  // 提示用戶確認是否儲存模板
  const isConfirmed = window.confirm("Are you sure you want to save your templates?");
  if (!isConfirmed) {
    console.log("User canceled the save operation.");
    return; // 如果用戶取消操作，則停止儲存
  }

  try {
    await templateStore.saveTemplatesToFirebase(); // 調用儲存方法
    console.log("簡報已儲存！");
    
    // 儲存成功後，跳轉到下一頁
    router.push('/Create/CreateInfo');
  } catch (error) {
    console.error("儲存簡報時出現錯誤:", error);
  }
};

</script>