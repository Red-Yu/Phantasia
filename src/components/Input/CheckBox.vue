<template>
  <div>
    <label>
      <span class="text">Web</span>

      <input type="checkbox" name="" id="" class="checkbox" />
      <span class="btn-box">
        <span class="btn"></span>
      </span>

      <span class="text">Mobile</span>
    </label>
  </div>
</template>

<style scoped>
label {
  display: flex;
  gap: 5px;
  align-items: center;

  .text {
    width: 20px;
    font-size: 12px;
    text-align: center;
  }
  .btn-box {
    display: inline-block;
    vertical-align: middle;
    width: 40px;
    height: 20px;
    border-radius: 100px;
    background-color: #dee2e6;
  }
  .btn-box .btn {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #153243;
    margin-left: 0; /*動畫從ml為0開始*/
    transition: 0.5s;
    box-shadow: 1px 2px 5px rgb(21, 50, 67, 0.5);
  }
  .checkbox {
    position: absolute;
    opacity: 0;
  }
  .checkbox:checked + .btn-box {
    background-color: #153243;
  }
  .checkbox:checked + .btn-box .btn {
    margin-left: 20px;
    background-color: #f9faf9;
  }
}
</style>
