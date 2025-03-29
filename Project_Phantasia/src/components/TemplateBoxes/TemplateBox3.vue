<template>
  <!-- <h1>這是Template 2</h1> -->
  <div class="TemplateWrapper">
    <div class="bgc"></div>
    <div class="textBox"></div>
  </div>
</template>

<style scoped>
.TemplateWrapper {
  background-color: #fff700;
  width: 100%;
  height: 100%;
  position: relative;
}
.bgc {
  width: 100%;
  height: 100%;
  z-index: 1;
}
.textBox {
  width: 300px;
  height: 300px;
  background-color: aliceblue;
  position: absolute;
  top: 0;
  left: 20px;
  z-index: 2;
}
</style>
