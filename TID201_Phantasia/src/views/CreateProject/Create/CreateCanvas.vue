<template>
  <div class="CreateCanvas">
    <!-- FunctionBar -->
    <div class="FunctionBar">
      <div class="Zoom">
        <button>+</button>
        <span> 100% </span>
        <button>-</button>
      </div>
      <div class="stepGroup">
        <div class="step">
          <div class="last"></div>
        </div>
        <div class="step">
          <div class="next"></div>
        </div>
      </div>
    </div>
    <div class="canvasGroup">
      <div class="canvas"></div>
      <div class="canvas"></div>
      <div class="canvas"></div>
      <div class="canvas"></div>
    </div>
    <!-- BTN - addCanvas -->
    <router-link to="./Create/CreateInfo">
      <div class="addCanvas">
        <div class="btnKey-M dark-border">
          <p>Add new page (先連到下一頁)</p>
          <!-- cross (icon) :內層 class 同上(內部還有其他元素不要掉了)-->
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
        </div>
      </div>
    </router-link>
  </div>
</template>
