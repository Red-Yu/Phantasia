<style scoped>
@import "../../Assets/css/main.css";
</style>

<template>
  <div class="wrapper">
    <div class="content">
      <!-- icon -->
      <div class="icon">
        <h1 style="font-size: 40px">ICON</h1>
        外層需再包一個 div (自行命名)，並使用 [$size : 數值] 定義icon的大小 !
        內層 icon class 命名方式 : 顏色-圖形名 如有其他地方需要使用 icon
        注意內部包含的標籤不要掉
        <div class="icon-group">
          <div class="i">
            <p>save</p>
            <div class="dark-save"></div>
          </div>
          <div class="i">
            <p>arrow</p>
            <div class="dark-arrow"></div>
          </div>
          <div class="i">
            <p>check</p>
            <div class="dark-check"></div>
          </div>
          <div class="i">
            <p>edit</p>
            <div class="dark-edit"></div>
          </div>
          <div class="i">
            <p>upload</p>
            <div class="dark-upload"></div>
          </div>
          <div class="i">
            <p>view</p>
            <div class="dark-view"></div>
          </div>
          <div class="i">
            <p>pen</p>
            <div class="dark-pen"></div>
          </div>
          <div class="i">
            <p>plus</p>
            <div class="dark-plus"></div>
          </div>
          <div class="i">
            <p>setting</p>
            <div class="dark-setting"></div>
          </div>
          <div class="i">
            <p>cross</p>
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
      <!-- button -->
      <div class="button">
        <h1 style="font-size: 40px">BUTTON</h1>
        ※ 沒有設定高度，使用時外面可以再包一個 div 比較不會跑掉 <br />
        ※ 注意內部包含的標籤不要掉了,不然也會顯示不出來 <br />
        <div class="howToUse key">
          <p>
            01 btnKey 主要標籤 :<br />
            1. 三種樣態 : dark、light、none<br />
            2. 外觀 class 命名方式 : btnKey-尺寸 (L/M) [空格] 顏色-有無邊框
            <br />
            3. icon class 命名方式 : <br />
            [外層]icon-尺寸 (L/M)/[內層]顏色-圖形名 <br />
            4. L: 24px ; M : 20px ;(目前暫定) <br />
            5. 沒有設定高度，使用時外面可以再包一個 div 比較不會跑掉 <br />
            6. 注意內部包含的標籤不要掉了,不然也會顯示不出來 <br />
          </p>
          <div class="btn-group">
            <!-- light -->
            <div class="btnKey-L light">
              <p>light</p>
              <!-- 一般圖形 (icon) :內層class 只需寫[顏色-樣式]-->
              <div class="icon-L">
                <div class="white-view"></div>
              </div>
            </div>
            <!-- dark (border無光暈!!) -->
            <div class="btnKey-L dark-border">
              <p>dark-border</p>
              <!-- cross (icon) :內層 class 同上(內部還有其他元素不要掉了)-->
              <div class="icon-L">
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
            <!-- none -->
            <div class="btnKey-L none">
              <p>none</p>
              <div class="icon-L">
                <div class="gray-edit"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="howToUse Link">
          <p>
            02 btnLink 連結標籤 :<br />
            1. 三種樣態 : dark、light、white<br />
            2. 外觀 class 命名方式 : btnLink [空格] 顏色<br />
            3. icon class 命名方式 : <br />
            [外層]icon-尺寸 (L/M)/[內層]顏色-圖形名 <br />
            4. 字體大小需要另外設定在外面包的那層 div (請在自己的頁面設定~~)<br />
          </p>
          <div class="btn-group">
            <!-- 左 icon -->
            <div class="btnLink light">
              <div class="icon-M">
                <div class="light-edit"></div>
              </div>
              <p>light-edit</p>
            </div>
            <!-- 右 icon -->
            <div class="btnLink dark">
              <div class="icon-M">
                <div class="dark-edit"></div>
              </div>
              <p>dark-edit</p>
            </div>
            <!-- 無 icon -->
            <div class="btnLink white">
              <p>white</p>
            </div>
          </div>
        </div>
      </div>
      <!-- sidebar -->
      <div class="sidebar">
        <div class="user">
          <div class="useImg">
            <div class="avatar"></div>
          </div>
        </div>
        <div class="tab-group">
          <div class="btnTab">
            <div class="text">
              <p>Collection</p>
            </div>
            <div class="tab-cross">
              <div class="cols">
                <span></span>
                <span></span>
              </div>
              <div class="rows">
                <span></span>
              </div>
            </div>
          </div>
          <div class="btnTab-click">
            <div class="text">
              <p>Draft</p>
            </div>
            <div class="tab-cross">
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
    </div>
  </div>
</template>
