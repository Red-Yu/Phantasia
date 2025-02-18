<template>
  <div class="modal-overlay" v-if="isVisible" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="bgc"></div>
      <button class="btm-close" @click="closeModal">關閉彈窗</button>
      <!-- mainContent -->
      <div class="mainContent PublishSuccess">
        <div class="titleGroup">
          <p class="top">
            <span class="large">L</span>
            <span class="middle">AUNCHED</span>
          </p>
          <p class="mid">
            <span class="line"></span>
            <span class="little">Is</span>
            <span class="line"></span>
          </p>
          <p class="btm">
            <span class="large">A</span>
            <span class="middle">LREADY</span>
          </p>
        </div>
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
