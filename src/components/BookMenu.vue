<!-- BookMenu.vue - 書本堆疊選單組件 -->
<template>
    <div class="bm-container" :class="{'bm-menu-open': isMenuOpen}">
      <!-- 漢堡按鈕 -->
      <div class="bm-hamburger-btn" @click="toggleMenu">
        <span></span>
        <span></span>
      </div>
      <!-- 全屏選單 -->
      <teleport to="body">
        <div class="bm-menu-overlay" :class="{'bm-visible': isMenuOpen}">
          <!-- 關閉按鈕 -->
          <div class="bm-close-btn" @click="toggleMenu">
            <span></span>
            <span></span>
          </div>
          
          <!-- 選單內容 - 調整為居中布局 -->
          <div class="bm-book-stack">
            <!-- 標題區域 -->
            <div class="bm-site-title">
              <h1 :class="{'bm-visible': isMenuOpen}">READING<br>IS MORE THAN<br>WORDS</h1>
              <p :class="{'bm-visible': isMenuOpen}">An Interactive<br>Journey Of<br>Exploration</p>
              <div class="bm-logo" :class="{'bm-visible': isMenuOpen}">
                <!-- 修改: 添加 router-link 讓 logo 可以連結到首頁 -->
                <router-link to="/" @click="closeMenu">
                  <img :src="logo" alt="logo" class="bm-logo-img">
                </router-link>
              </div>
            </div>
        
            <!-- 書本堆疊 -->
            <div class="bm-books">
              <!-- <router-link to="/" class="bm-book bm-book-1" :class="{'bm-visible': isMenuOpen}">
                <img :src="book1Image" alt="Stories Book" class="bm-book-image">
              </router-link> -->
              
              <!-- 修改: 為每個 router-link 添加 @click="closeMenu" -->
              <router-link to="/MyCabin" class="bm-book bm-book-2" :class="{'bm-visible': isMenuOpen}" @click="closeMenu">
                <img :src="book2Image" alt="My Cabin" class="bm-book-image">
              </router-link>
              
              <router-link to="/About" class="bm-book bm-book-3" :class="{'bm-visible': isMenuOpen}" @click="closeMenu">
                <img :src="book3Image" alt="About" class="bm-book-image">
              </router-link>
              
              <router-link to="/Products" class="bm-book bm-book-4" :class="{'bm-visible': isMenuOpen}" @click="closeMenu">
                <img :src="book4Image" alt="Products" class="bm-book-image">
              </router-link>
              
              <router-link to="/MemberCenter" class="bm-book bm-book-5" :class="{'bm-visible': isMenuOpen}" @click="closeMenu">
                <img :src="book5Image" alt="Member Center" class="bm-book-image">
              </router-link>
              
              <router-link to="/CreateProject" class="bm-book bm-book-6" :class="{'bm-visible': isMenuOpen}" @click="closeMenu">
                <img :src="book6Image" alt="Create Project" class="bm-book-image">
              </router-link>
            </div>
          </div>
        </div>
      </teleport>
    </div>
  </template>
    
  <script setup>
  import { ref } from "vue";
  import book1Image from '@/assets/img/menu/bookPhantasia.svg'
  import book2Image from '@/assets/img/menu/bookMyCabin.png'
  import book3Image from '@/assets/img/menu/bookAboutPhantasia.png'
  import book4Image from '@/assets/img/menu/bookStory.png'
  import book5Image from '@/assets/img/menu/bookMemberCenter.png'
  import book6Image from '@/assets/img/menu/bookCreationCenter.svg'
  import logo from '@/assets/img/menu/logo.svg'
    
  const isMenuOpen = ref(false);
    
  // 切換選單開關
  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
    
    if (isMenuOpen.value) {
      // 記錄當前滾動位置
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // 恢復滾動位置
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  };
  
  // 專門用於關閉選單的函數
  const closeMenu = () => {
    if (isMenuOpen.value) {
      isMenuOpen.value = false;
      
      // 恢復滾動位置
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  };
  </script>
    
  <style>
  /* 使用前綴避免衝突 */
  /* 基本樣式 */
  .bm-container {
    position: relative;
    z-index: 9990 !important;
  }
  
  /* 漢堡按鈕樣式 */
  .bm-hamburger-btn {
    position: fixed;
    top: 15px;
    right: 15px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 100000 !important;
    transition: all 0.3s ease;
  }
  
  .bm-hamburger-btn span {
    display: block;
    width: 24px;
    height: 2px;
    background-color: white;
    margin: 3px 0;
    transition: all 0.3s ease;
  }
  
  .bm-menu-open .bm-hamburger-btn span:first-child {
    transform: translateY(5px) rotate(45deg);
  }
  
  .bm-menu-open .bm-hamburger-btn span:last-child {
    transform: translateY(-5px) rotate(-45deg);
  }
  
  /* 關閉按鈕樣式 */
  .bm-close-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 100001 !important;
    transition: all 0.3s ease;
  }
  
  .bm-close-btn span {
    display: block;
    width: 24px;
    height: 2px;
    background-color: white;
    margin: 0;
    transition: all 0.3s ease;
  }
  
  .bm-close-btn span:first-child {
    transform: rotate(45deg);
  }
  
  .bm-close-btn span:last-child {
    transform: rotate(-45deg);
    position: relative;
    top: -2px;
  }
  
  .bm-close-btn:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
  
  /* 選單覆蓋層 */
  .bm-menu-overlay {
    position: fixed;
    padding: 15px;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #153243 0%, #1a4161 50%, #153243 100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.5s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99999 !important;
    overflow: hidden;
    top: 0;
    left: 0;
  }
  
  .bm-menu-overlay.bm-visible {
    opacity: 1 !important;
    visibility: visible !important;
  }
  
  /* 調整魔法粒子背景效果的大小和不透明度 */
  .bm-menu-overlay.bm-visible::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(circle at 20% 35%, rgba(255, 255, 255, 0.35) 1.2px, transparent 1.2px),
      radial-gradient(circle at 75% 44%, rgba(255, 255, 255, 0.35) 1.2px, transparent 1.2px),
      radial-gradient(circle at 46% 52%, rgba(255, 255, 255, 0.35) 1.2px, transparent 1.2px),
      radial-gradient(circle at 35% 85%, rgba(255, 255, 255, 0.35) 1.2px, transparent 1.2px),
      radial-gradient(circle at 62% 67%, rgba(255, 255, 255, 0.35) 1.2px, transparent 1.2px),
      radial-gradient(circle at 82% 77%, rgba(255, 255, 255, 0.35) 1.2px, transparent 1.2px);
    background-size: 110px 110px;
    animation: bm-floating-particles 12s linear infinite;
    opacity: 0.7;
    pointer-events: none;
  }
  
  /* 書本堆疊容器 - 修改布局為居中 */
  .bm-book-stack {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; /* 確保內容垂直居中 */
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
    padding: 15px;
    position: relative;
  }
  
  /* 標題區域 - 調整為絕對定位，提高 z-index 確保在書本上方 */
  .bm-site-title {
    position: absolute;
    top: 5%; /* 調整標題區域位置 */
    left: 5%;
    text-align: left;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0px;
    gap: 20px;
    filter: drop-shadow(0px 4px 20px rgba(0, 0, 0, 0.4));
    z-index: 10; /* 提高 z-index，原本是 1 */
    pointer-events: none; /* 確保點擊事件可以穿透到書本 */
  }
  
  .bm-site-title h1 {
    font-family: 'Aleo';
    font-style: normal;
    font-weight: 700;
    font-size: 6vw; /* 調整字體大小為相對單位 */
    line-height: 100%;
    text-align: left;
    display: flex;
    align-items: center;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.31);
    backdrop-filter: blur(7.05px);
    opacity: 0;
    transform: translateY(-20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  
  .bm-site-title h1.bm-visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .bm-site-title p {
    font-family: 'Aleo';
    font-style: normal;
    font-weight: 900;
    font-size: 2vw; /* 調整字體大小為相對單位 */
    line-height: 120%;
    display: flex;
    align-items: center;
    text-transform: capitalize;
    text-align: left;
    color: rgba(255, 255, 255, 0.31);
    opacity: 0;
    transform: translateY(-20px);
    transition: opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s;
  }
  
  .bm-site-title p.bm-visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .bm-logo {
    margin-top: 30px;
    text-align: center;
    max-height: 15vh;
    opacity: 0;
    transform: translateY(-20px);
    transition: opacity 0.5s ease 0.4s, transform 0.5s ease 0.4s;
    pointer-events: auto; /* 確保 logo 仍然可點擊 */
  }
  
  .bm-logo.bm-visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  /* logo 連結樣式 */
  .bm-logo a {
    display: inline-block;
    text-decoration: none;
    cursor: pointer;
    transition: transform 0.3s ease;
  }
  
  .bm-logo a:hover {
    transform: scale(1.05);
    filter: brightness(1.2);
  }
  
  .bm-logo-img {
    max-width: 180px;
    max-height: 120px;
    object-fit: contain;
  }
  
  /* 書本樣式 - 調整為更緊密的堆疊並向下移動 */
  .bm-books {
    width: 100%;
    max-width: 600px; /* 給一個合理的最大寬度 */
    position: relative;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto; /* 水平居中 */
    transform: translateY(20%);
    z-index: 2;
    perspective: 1200px; /* 增強3D透視效果 */
  }
  
  .bm-book {
    position: relative;
    width: 100%;
    max-width: 580px; /* 限制書本最大寬度 */
    height: 70px; /* 略微增加高度 */
    margin-bottom: -5px; /* 減少負margin來減少重疊 */
    cursor: pointer;
    opacity: 0;
    transform: translateY(-100vh); /* 初始位置在視窗上方外 */
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    transform-style: preserve-3d; /* 保持3D效果 */
    backface-visibility: hidden; /* 優化3D渲染 */
    filter: drop-shadow(0 5px 10px rgba(0, 0, 0, 0.3)); /* 減小陰影 */
  }
  
  /* 修改書本魔法光芒效果，使其更加自然 */
  .bm-book.bm-visible::after {
    content: '';
    position: absolute;
    top: -20px;       /* 擴大影響範圍，超出書本實際邊界 */
    left: -20px;
    width: calc(100% + 40px);  /* 增加寬度，使邊緣更加柔和 */
    height: calc(100% + 40px); /* 增加高度，使邊緣更加柔和 */
    background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
    opacity: 0;
    animation: bm-book-glow 2s ease-in-out infinite alternate;
    pointer-events: none;
    z-index: 1;
    border-radius: 50%;  /* 使光芒呈現圓形，而非矩形 */
  }
  
  /* 書本懸停時的特效 */
  .bm-book.bm-visible::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
    z-index: 2;
  }
  
  .bm-book.bm-visible:hover::before {
    opacity: 1;
    animation: bookShine 1.5s infinite alternate;
  }
  
  /* 統一所有書本的懸停效果，與My Cabin一致 */
  /* 為所有書本統一設置相同的懸停效果 */
  .bm-book.bm-visible:hover {
  /* 往上移動5px */
  filter: brightness(1.2) drop-shadow(0 0 15px rgba(255, 255, 255, 0.5));
  transition: filter 0.3s ease, transform 0.3s ease; /* 添加transform到transition屬性 */
  }
  
  /* 增強所有書本的光芒效果 */
  .bm-book.bm-visible:hover::after {
    opacity: 0.6 !important; /* 稍微增強亮度 */
  }
  
  /* 確保所有書本懸停時圖片不變形 */
  .bm-book.bm-visible:hover .bm-book-image {
    transform: none !important; /* 移除任何變形 */
    filter: brightness(1.1); /* 只增加亮度 */
  }
  
  /* 為每本書單獨設置懸停時保持原位的樣式 */
  .bm-book-2.bm-visible:hover {
  transform: translateY(-65px) rotate(-1deg) !important;
  }

  .bm-book-3.bm-visible:hover {
    transform: translateY(-50px) rotate(-1deg) !important;
  }

  .bm-book-4.bm-visible:hover {
    transform: translateY(-40px) rotate(-1deg) !important;
  }

  .bm-book-5.bm-visible:hover {
    transform: translateY(-25px) rotate(-1deg) !important;
  }

  .bm-book-6.bm-visible:hover {
    transform: translateY(-5px) rotate(-1deg) !important;
  }
  
  /* 保持原有的z-index順序 */
  .bm-book-2.bm-visible { 
    z-index: 6 !important;
    position: relative;
  }
  .bm-book-3.bm-visible { z-index: 5; }
  .bm-book-4.bm-visible { z-index: 4; }
  .bm-book-5.bm-visible { z-index: 3; }
  .bm-book-6.bm-visible { z-index: 2; }
  
  /* 特別針對router-link的樣式，確保router-link元素也有相同的動畫效果 */
  router-link.bm-book.bm-visible {
    opacity: 1;
    position: relative;
    cursor: pointer;
    text-decoration: none;
  }
  
  /* 書本掉落的時間差與層級關係 - 更緊密的堆疊，並調慢動畫速度 */
  .bm-book-6.bm-visible,
  router-link.bm-book-6.bm-visible {
    opacity: 1;
    transform: translateY(0) rotate(-1deg);
    transition-delay: 0.1s;
    z-index: 2;
    animation: bm-book-appear 1.2s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards; /* 增加動畫時間 */
    animation-delay: 0.1s;
  }
  
  .bm-book-5.bm-visible,
  router-link.bm-book-5.bm-visible {
    opacity: 1;
    transform: translateY(-15px) rotate(-1deg);
    transition-delay: 0.3s; /* 增加延遲 */
    z-index: 3;
    animation: bm-book-appear 1.2s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards; /* 增加動畫時間 */
    animation-delay: 0.3s; /* 增加延遲 */
  }
  
  .bm-book-4.bm-visible,
  router-link.bm-book-4.bm-visible {
    opacity: 1;
    transform: translateY(-30px) rotate(-1deg);
    transition-delay: 0.5s; /* 增加延遲 */
    z-index: 4;
    animation: bm-book-appear 1.2s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards; /* 增加動畫時間 */
    animation-delay: 0.5s; /* 增加延遲 */
  }
  
  .bm-book-3.bm-visible,
  router-link.bm-book-3.bm-visible {
    opacity: 1;
    transform: translateY(-45px) rotate(-1deg);
    transition-delay: 0.7s; /* 增加延遲 */
    z-index: 5;
    animation: bm-book-appear 1.2s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards; /* 增加動畫時間 */
    animation-delay: 0.7s; /* 增加延遲 */
  }
  
  .bm-book-2.bm-visible,
  router-link.bm-book-2.bm-visible {
    opacity: 1;
    transform: translateY(-60px) rotate(-1deg);
    transition-delay: 0.9s; /* 增加延遲 */
    z-index: 6;
    animation: bm-book-appear 1.2s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards; /* 增加動畫時間 */
    animation-delay: 0.9s; /* 增加延遲 */
  }
  
  /* 修改書本出現的動畫，讓書本堆疊更緊密，動畫更慢 */
  @keyframes bm-book-appear {
    0% {
      transform: translateY(-100vh);
    }
    60% { /* 調整中間過程，讓過度更自然 */
      transform: translateY(var(--book-y-overshoot, 10px)) rotate(var(--book-rotate, -1deg));
    }
    85% { /* 增加中間步驟，讓動畫更緩慢 */
      transform: translateY(calc(var(--book-y) - 5px)) rotate(var(--book-rotate, -1deg));
    }
    100% {
      transform: translateY(var(--book-y, 0)) rotate(var(--book-rotate, -1deg));
    }
  }
  
  /* 書本之間的CSS變量，調整為更合適的間距 */
  .bm-book-6, router-link.bm-book-6 {
    --book-y: 6px;
    --book-y-overshoot: 25px;
    --book-rotate: -1deg;
  }
  
  .bm-book-5, router-link.bm-book-5 {
    --book-y: -20px; /* 調整距離，讓book5更靠近book4 */
    --book-y-overshoot: -5px;
    --book-rotate: -1deg;
  }
  
  .bm-book-4, router-link.bm-book-4 {
    --book-y: -35px; /* 調整距離，讓book4更靠近book3 */
    --book-y-overshoot: -25px;
    --book-rotate: -1deg;
  }
  
  .bm-book-3, router-link.bm-book-3 {
    --book-y: -45px; /* 恢復原來的距離 */
    --book-y-overshoot: -35px;
    --book-rotate: -1deg;
  }
  
  .bm-book-2, router-link.bm-book-2 {
    --book-y: -60px; /* 保持不變 */
    --book-y-overshoot: -55px;
    --book-rotate: -1deg;
  }
  
  /* 書本圖片樣式 */
  .bm-book-image {
    width: 100%;
    height: auto;
    object-fit: contain; /* 保持圖片比例 */
    position: relative; /* 改為相對定位 */
  }
  
  /* 修改書本光芒動畫，使其更加自然 */
  @keyframes bm-book-glow {
    0% {
      opacity: 0;
      transform: scale(0.95);
    }
    100% {
      opacity: 0.3;
      transform: scale(1.05);
    }
  }
  
  /* 書本光澤效果動畫 */
  @keyframes bookShine {
    0% {
      background-position: -100% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
  
  /* 添加更多變化的浮動粒子動畫 */
  @keyframes bm-floating-particles {
    0% {
      background-position: 0 0;
    }
    50% {
      background-position: 55px 55px; /* 中間點的位移，讓動畫更有變化 */
    }
    100% {
      background-position: 110px 110px;
    }
  }
  </style>