<template>
  <div class="Wrapper">
    <div class="bgc"></div>
    <div class="textBox"></div>
  </div>
</template>

<style scoped>
.Wrapper {
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
  width: 360px;
  height: 360px;
  background-color: aliceblue;
  position: absolute;
  top: 0;
  left: 20px;
  z-index: 2;
}
</style>
