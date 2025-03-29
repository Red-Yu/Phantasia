<template>
  <div class="CreateImgInput">
    <!-- 隱藏的 input -->
    <input type="file" id="CreateImgInput" class="hidden-input" />
    <!-- 上傳按鈕 -->
    <label for="CreateImgInput" class="btnKey-M dark-border">
      <p>Upload File</p>
      <div class="icon-M">
        <div class="dark-cross">
          <div class="cols">
            <span></span>
            <span></span>
          </div>
          <div class="rows">
            <span></span>
          </div>
        </div>
      </div>
    </label>
  </div>
</template>

<style scoped>
.hidden-input {
  display: none;
}
</style>
