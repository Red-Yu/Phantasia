<template>
  <div class="modal-overlay" v-if="isVisible" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="FullScreenModalBgc"></div>
      <!-- mainContent -->
      <div class="mainContent PublishSuccess">
        <TitleTemplate firstTitle="Launched" middleText="Is" secondTitle="Already" />
        <div class="btnGroup">
          <router-link class="backToCreate" to="/CreateProject" @click="closeModal">
            <div class="btnKey-L light">
              <p>Back To Creating</p>
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
          <router-link
            class="listOfShelves"
            to="/MemberCenter/MyProjects"
            @click="closeModal"
          >
            <div class="btnKey-L light-border">
              <p>List Of Works On The Shelves</p>
              <div class="icon-L">
                <div class="light-cross">
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
  </div>
</template>

<script setup>
import TitleTemplate from "../../../components/TitleTemplate.vue";

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
