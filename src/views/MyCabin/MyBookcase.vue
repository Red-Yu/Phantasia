<style scoped>
@import "../../Assets/css/myBookcase.css";
</style>



<template>
  <div>
    <div id="info">
      <a href="https://threejs.org" target="_blank" rel="noopener">three.js</a>
      css3d - periodic table.
    </div>
    <div id="container" ref="container"></div>

    <div id="menu">
      <button class="btnKey-M dark" @click="handleClick('helix', false)">HELIX</button>      
      <button class="btnKey-M dark" @click="handleClick('table', true)">EDIT</button>
      <button class="btnKey-M dark" @click="handleClick('sphere', false)">SPHERE</button>
      <button class="btnKey-M dark" @click="handleClick('grid', false)">GRID</button>

   
    </div>
  </div>
</template>
   <!-- //使用 Vue 的 @click 綁定方法來監聽按鈕點擊事件，觸發不同佈局轉換 --> 
<script>
import * as THREE from "three";
import { TrackballControls } from "three/addons/controls/TrackballControls.js";
import {
  CSS3DRenderer,
  CSS3DObject,
} from "three/addons/renderers/CSS3DRenderer.js";
import * as TWEEN from "@tweenjs/tween.js";


export default {
  name: "Book",
  data() {
    return {
      // 定義相機、場景、渲染器等核心 Three.js 物件
      camera: null,
      scene: null,
      renderer: null,
      controls: null,
      objects: [], // 存儲場景中的 3D 物件
      targets: { table: [], sphere: [], helix: [], grid: [] }, // 不同佈局的目標位置
      table: [
        "path_to_image1",
        "3333",
        "Book Tiatle",
        3,
        6,
        "path_to_image2",
        "",
        "Book Tiatle",
        3,
        3,
        "path_to_image4",
        "",
        "Book Tiatle",
        12,
        3,
        "path_to_image5",
        "",
        "A05",
        5,
        3,
        "path_to_image6",
        "",
        "Book Tiatle",
        6,
        3,
        "path_to_image7",
        "",
        "Book Tiatle",
        7,
        3,
        "path_to_image8",
        "",
        "Book Tiatle",
        8,
        3,
        "path_to_image1",
        "",
        "Book Tiatle",
        9,
        3,
        "path_to_image1",
        "",
        "Book Tiatle",
        10,
        3,
        "path_to_image2",
        "",
        "Book Tiatle",
        11,
        3,
        "path_to_image3",
        "",
        "Book Tiatle",
        1,
        3,
        "path_to_image4",
        "",
        "Book Tiatle",
        2,
        3,
        "path_to_image5",
        "",
        "Book Tiatle",
        13,
        3,
        "path_to_image6",
        "",
        "Book Tiatle",
        14,
        3,
        "path_to_image7",
        "",
        "Book Tiatle",
        15,
        3,
        "path_to_image8",
        "",
        "Book Tiatle",
        16,
        3,
        "path_to_image4",
        "",
        "Book Tiatle",
        17,
        3,
        "path_to_image1",
        "",
        "Book Tiatle",
        18,
        3,
        "path_to_image2",
        "",
        "Book Tiatle",
        1,
        4,
        "path_to_image3",
        "",
        "Book Tiatle",
        2,
        4,
        "path_to_image4",
        "",
        "Book Tiatle",
        3,
        4,
        "path_to_image5",
        "",
        "Book Tiatle",
        4,
        4,
        "path_to_image6",
        "",
        "Book Tiatle",
        5,
        4,
        "path_to_image7",
        "",
        "Book Tiatle",
        6,
        4,
        "path_to_image8",
        "",
        "Book Tiatle",
        7,
        4,
        "path_to_image1",
        "",
        "Book Tiatle",
        8,
        4,
        "path_to_image2",
        "",
        "Book Tiatle",
        9,
        4,
        "path_to_image3",
        "",
        "Book Tiatle",
        10,
        4,
        "path_to_image4",
        "",
        "Book Tiatle",
        11,
        4,
        "path_to_image5",
        "",
        "Book Tiatle",
        12,
        4,
        "path_to_image6",
        "",
        "Book Tiatle",
        13,
        4,
        "path_to_image7",
        "",
        "Book Tiatle",
        14,
        4,
        "path_to_image8",
        "",
        "Book Tiatle",
        15,
        4,
        "path_to_image1",
        "",
        "Book Tiatle",
        16,
        4,
        "path_to_image2",
        "",
        "Book Tiatle",
        17,
        4,
        "path_to_image3",
        "",
        " Book Tiatle",
        18,
        4,
        "path_to_image4",
        "",
        "Book Tiatle",
        1,
        5,
        "path_to_image6",
        "",
        "Book Tiatle",
        2,
        5,
        "path_to_image7",
        "",
        "Book Tiatle",
        3,
        5,
        "path_to_image8",
        "",
        "Book Tiatle",
        4,
        5,
        "path_to_image1",
        "",
        "Book Tiatle",
        5,
        5,
        "path_to_image2",
        "",
        "Book Tiatle",
        6,
        5,
        "path_to_image3",
        "",
        "Book Tiatle",
        7,
        5,
        "path_to_image4",
        "",
        "Book Tiatle",
        8,
        5,
        "path_to_image5",
        "",
        "Book Tiatle",
        9,
        5,
        "path_to_image6",
        "",
        "Book Tiatle",
        10,
        5,
        "path_to_image7",
        "",
        "Book Tiatle",
        11,
        5,
        "path_to_image8",
        "",
        "Book Tiatle",
        12,
        5,
        "path_to_image1",
        "",
        "Book Tiatle",
        13,
        5,
        "path_to_image2",
        "",
        "Book Tiatle",
        14,
        5,
        "path_to_image3",
        "",
        "Book Tiatle",
        15,
        5,
        "path_to_image4",
        "",
        "Book Tiatle",
        16,
        5,
        "path_to_image5",
        "",
        "Book Tiatle",
        17,
        5,
        "path_to_image6",
        "",
        "Book Tiatle",
        18,
        5,
        "path_to_image7",
        "",
        "Book Tiatle",
        1,
        6,
        "path_to_image8",
        "",
        "Book Tiatle",
        2,
        6,
        "path_to_image1",
        "",
        "Book Tiatle",
        4,
        9,
        "path_to_image2",
        "",
        "Book Tiatle",
        5,
        9,
        "path_to_image3",
        "",
        "Book Tiatle",
        6,
        9,
        "path_to_image4",
        "",
        "Book Tiatle",
        7,
        9,
        "path_to_image5",
        "",
        "Book Tiatle",
        8,
        9,
        "path_to_image6",
        "",
        "Book Tiatle",
        9,
        9,
        "path_to_image7",
        "",
        "Book Tiatle",
        10,
        9,
        "path_to_image8",
        "",
        "Book Tiatle",
        11,
        9,
        "path_to_image1",
        "",
        "Book Tiatle",
        12,
        9,
        "path_to_image2",
        "",
        "Book Tiatle",
        13,
        9,
        "path_to_image3",
        "",
        "Book Tiatle",
        14,
        9,
        "path_to_image4",
        "",
        "Book Tiatle",
        15,
        9,
        "path_to_image5",
        "",
        "",
        16,
        9,
        "path_to_image6",
        "",
        "Book Tiatle",
        4,
        3,
        "path_to_image7",
        "",
        "Book Tiatle",
        3,
        9,
        "path_to_image8",
        "",
        "Book Tiatle",
        4,
        6,
        "path_to_image1",
        "",
        "Book Tiatle",
        5,
        6,
        "path_to_image2",
        "",
        "Book Tiatle",
        6,
        6,
        "path_to_image3",
        "",
        "Book Tiatle",
        7,
        6,
        "path_to_image4",
        "",
        "Book Tiatle",
        8,
        6,
        "path_to_image5",
        "",
        "Book Tiatle",
        9,
        6,
        "path_to_image6",
        "",
        "Book Tiatle",
        10,
        6,
        "path_to_image7",
        "",
        "Book Tiatle",
        11,
        6,
        "path_to_image8",
        "",
        "Book Tiatle",
        12,
        6,
        "path_to_image1",
        "",
        "Book Tiatle",
        13,
        6,
        "path_to_image2",
        "",
        "Book Tiatle",
        14,
        6,
        "path_to_image3",
        "",
        "Book Tiatle",
        15,
        6,
        "path_to_image4",
        "",
        "Book Tiatle",
        16,
        6,
        "path_to_image5",
        "",
        "Book Tiatle",
        17,
        6,
        "path_to_image6",
        "",
        "Book Tiatle",
        18,
        6,
        "path_to_image1",
        "",
        "Book Tiatle",
        4,
        10,
        "path_to_image2",
        "",
        "Book Tiatle",
        5,
        10,
        "path_to_image3",
        "",
        "Book Tiatle",
        6,
        10,
        "path_to_image4",
        "",
        "Book Tiatle",
        7,
        10,
        "path_to_image5",
        "",
        "Book Tiatle",
        8,
        10,
        "path_to_image6",
        "",
        "Book Tiatle",
        9,
        10,
        "path_to_image7",
        "",
        "Book Tiatle",
        10,
        10,
        "path_to_image8",
        "",
        "Book Tiatle",
        11,
        10,
        "path_to_image1",
        "",
        "Book Tiatle",
        12,
        10,
        "path_to_image2",
        "",
        "Book Tiatle",
        13,
        10,
        "path_to_image3",
        "",
        "Book Tiatle",
        14,
        10,
        "path_to_image4",
        "",
        "Book Tiatle",
        15,
        10,
        "path_to_image5",
        "",
        "Book Tiatle",
        16,
        10,
        "path_to_image6",
        "",
        "Book Tiatle",
        4,
        3,
        "path_to_image7",
        "",
        "Book Tiatle",
        3,
        10,
      ],
      isRemoveCloseBtn: false, // 是否移除關閉按鈕
    };
  },
  methods: {
    init() {
      // 初始化相機，設置視角和距離
      this.camera = new THREE.PerspectiveCamera(
        40,
        window.innerWidth / window.innerHeight,
        1,
        10000
      );
      this.camera.position.z = 3000;

      // 初始化場景
      this.scene = new THREE.Scene();

      // 建立 table 佈局
      for (let index = 0; index < this.table.length; index += 5) {
        // const index = i;
        const element = document.createElement("div");
        element.className = "element";
        element.style.backgroundColor = `rgba(0,127,127,${
          Math.random() * 0.5 + 0.175
        })`;

        // 關閉按鈕
        const closeBtn = document.createElement("div");
        closeBtn.id = "close-btn-" + index;
        closeBtn.className = "close-btn close-btn-d-none";
        closeBtn.textContent = "×";
        element.appendChild(closeBtn);

        // 元素圖片
        const symbol = document.createElement("div");
        symbol.className = "symbol";
        const img = document.createElement("img");
        // img.src = "/images/" + this.table[index] + ".png";
        img.src = new URL(
          "../../Assets/img/myBookcase/" + this.table[index] + ".png",
          import.meta.url
        ).href;

        // new URL(`../Assets/Day/bookRows_lightoff.png`, import.meta.url).href,

        img.onerror = () => console.error("圖片載入失敗:", this.table[index]);
        symbol.appendChild(img);
        element.appendChild(symbol);

        // 創建並設置詳細資訊
        const details = document.createElement("div");
        details.className = "details";
        details.innerHTML = `${this.table[index + 1]}<br>${
          this.table[index + 2]
        }`;
        element.appendChild(details);

        // 創建 CSS3D 物件並添加到場景
        const objectCSS = new CSS3DObject(element);
        objectCSS.position.x = Math.random() * 4000 - 2000;
        objectCSS.position.y = Math.random() * 4000 - 2000;
        objectCSS.position.z = Math.random() * 4000 - 2000;
        this.scene.add(objectCSS);

        this.objects.push(objectCSS);

        // 設置元素在 table 佈局中的目標位置
        const object = new THREE.Object3D();
        object.position.x = this.table[index + 3] * 140 - 1330;
        object.position.y = -(this.table[index + 4] * 180) + 990;
        this.targets.table.push(object);
      }

      // 初始化渲染器並掛載到 DOM
      this.renderer = new CSS3DRenderer();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.$refs.container.appendChild(this.renderer.domElement);

      // 初始化控制器，用於鼠標控制相機視角
      this.controls = new TrackballControls(
        this.camera,
        this.renderer.domElement
      );

      // 限制縮放範圍
      this.controls.minDistance = 500;
      this.controls.maxDistance = 6000;

      this.controls.addEventListener("change", this.render);

      // 創建其他佈局(sphere, helix, grid)
      this.createLayouts();

      // 初始轉換為 helix 佈局
      this.transform(this.targets.helix, 2000);

      // 監聽視窗大小調整事件監聽器
      window.addEventListener("resize", this.onWindowResize);
    },
    /**
     * createLayouts 方法用於計算物件在 sphere、helix 和 grid 佈局中的目標位置。
     *
     * - Sphere 佈局：計算每個物件在球面上的位置，並將其目標位置存儲在 this.targets.sphere 中。
     * - Helix 佈局：計算每個物件在螺旋線上的位置，並將其目標位置存儲在 this.targets.helix 中。
     * - Grid 佈局：計算每個物件在網格中的位置，並將其目標位置存儲在 this.targets.grid 中。
     *
     * @method createLayouts
     */
    createLayouts() {
      // 用於計算物件目標位置的輔助向量
      const vector = new THREE.Vector3();

      // 為每個物件計算 sphere、helix 和 grid 佈局的目標位置
      this.objects.forEach((_, i) => {
        // Sphere 佈局, 計算球形佈局的位置
        const phi = Math.acos(-1 + (2 * i) / this.objects.length);

        // 計算球形佈局的經度
        const theta = Math.sqrt(this.objects.length * Math.PI) * phi;

        // 創建物件
        const objectSphere = new THREE.Object3D();

        // 設定物件位置
        objectSphere.position.setFromSphericalCoords(900, phi, theta);

        // 計算物件的觀看方向
        vector.copy(objectSphere.position).multiplyScalar(2);

        // 設定物件的觀看方向
        objectSphere.lookAt(vector);

        // 加入場景
        this.targets.sphere.push(objectSphere);

        // Helix 佈局
        // 計算 theta 角度
        const thetaHelix = i * 0.28 + Math.PI;

        // 計算 y 軸位置
        const yHelix = -(i * 8) + 450;

        // 創建物件
        const objectHelix = new THREE.Object3D();

        // 設定物件位置
        objectHelix.position.setFromCylindricalCoords(1200, thetaHelix, yHelix);

        // 計算物件的觀看方向
        vector.x = objectHelix.position.x * 2;
        vector.y = objectHelix.position.y;
        vector.z = objectHelix.position.z * 2;

        // 設定物件的觀看方向
        objectHelix.lookAt(vector);

        // 加入場景
        this.targets.helix.push(objectHelix);

        // Grid 佈局
        // 創建物件
        const objectGrid = new THREE.Object3D();

        // 設定物件位置
        objectGrid.position.x = (i % 4) * 500 - 800;
        objectGrid.position.y = -(Math.floor(i / 4) % 4) * 500 + 800;
        objectGrid.position.z = Math.floor(i / 16) * 1000 - 2000;

        this.targets.grid.push(objectGrid);
      });
    },
    /**
     * 將物件轉換到目標位置和旋轉角度，並設置動畫效果。
     *
     * @param {Array} targets - 目標位置和旋轉角度的數組，每個元素包含 position 和 rotation 屬性。
     * @param {number} duration - 動畫持續時間，以毫秒為單位。
     *
     * 此方法會停止所有當前的動畫，並為每個物件設置新的位置和旋轉動畫。
     * 動畫使用指數緩動效果 (Exponential.InOut)。
     * 最後，設置一個更新渲染的動畫。
     */
    transform(targets, duration) {
      // 停止所有當前的動畫
      TWEEN.removeAll();

      // 遍歷所有物件，為每個物件設置動畫
      this.objects.forEach((object, i) => {
        const target = targets[i];

        // 位置動畫
        new TWEEN.Tween(object.position)
          .to(
            {
              x: target.position.x,
              y: target.position.y,
              z: target.position.z,
            },
            Math.random() * duration + duration
          )
          .easing(TWEEN.Easing.Exponential.InOut)
          .start();

        // 旋轉動畫
        new TWEEN.Tween(object.rotation)
          .to(
            {
              x: target.rotation.x,
              y: target.rotation.y,
              z: target.rotation.z,
            },
            Math.random() * duration + duration
          )
          .easing(TWEEN.Easing.Exponential.InOut)
          .start();
      });

      // 渲染更新動畫
      new TWEEN.Tween(this)
        .to({}, duration * 2)
        .onUpdate(this.render)
        .start();
    },
    // 顯示或隱藏關閉按鈕
    addCloseBtn(isAddCloseBtn = true) {
      if (this.isRemoveCloseBtn !== isAddCloseBtn) {
        this.isRemoveCloseBtn = isAddCloseBtn;
        document
          .querySelectorAll(".close-btn")
          .forEach((btn) => btn.classList.remove("close-btn-d-none"));
      }
    },
    removeCloseBtn(isAddCloseBtn = false) {
      if (this.isRemoveCloseBtn !== isAddCloseBtn) {
        this.isRemoveCloseBtn = isAddCloseBtn;
        document
          .querySelectorAll(".close-btn")
          .forEach((btn) => btn.classList.add("close-btn-d-none"));
      }
    },
    handleClick(target, isAddCloseBtn) {
      if (isAddCloseBtn) {
        this.addCloseBtn(true);
      } else {
        this.removeCloseBtn(false);
      }
      this.transform(this.targets[target], 2000);
    },
    /**
     * 視窗大小調整事件監聽器
     */
    onWindowResize() {
      // 調整相機和渲染器的大小
      this.camera.aspect = window.innerWidth / window.innerHeight;

      // 更新投影矩陣
      this.camera.updateProjectionMatrix();

      // 設定渲染器的大小
      this.renderer.setSize(window.innerWidth, window.innerHeight);

      this.render();
    },
    animate() {
      // 使用 requestAnimationFrame 進行動畫更新
      requestAnimationFrame(this.animate);
      TWEEN.update(); // 更新所有動畫
      this.controls.update(); // 更新控制器
    },
    render() {
      // 渲染場景
      this.renderer.render(this.scene, this.camera);
    },
    // 新增方法來處理樣式
    addGlobalStyles() {
      const styleElement = document.createElement("style");
      styleElement.id = "bookcase-global-styles";
      styleElement.textContent = `
        body {
          padding: 0;
          margin: 0;
          background-color: rgb(25, 25, 25);
          color: #fff;
          overscroll-behavior: none;
          width: 100%;
          height: 100vh;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center center;
          background-image: -webkit-image-set("${new URL(
            "../../Assets/img/myBookcase/bookcaseBg.png",
            import.meta.url
          )}");
          cursor: none;
        }

        a {
          color: #8ff;
        }

        .star {
          position: fixed;
          background-color: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          pointer-events: none;
          box-shadow: 0 0 10px rgba(6, 220, 244, 0.9);
          animation: twinkle 1s ease-out forwards;
          transform: translate(-50%, -50%);
        }

        @keyframes twinkle {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.5);
          }
          100% {
            opacity: 0;
            transform: scale(0.8);
          }
        }

        .wand {
          position: fixed;
          width: 100px;
          height: auto;
          background: url("${new URL(
            "../../Assets/img/myBookcase/mouse1.jpg",
            import.meta.url
          )}") no-repeat center center;
          background-size: contain;
          pointer-events: none;
          transform-origin: bottom right;
          transform: rotate(-45deg);
        }
      `;
      document.head.appendChild(styleElement);
    },

    removeGlobalStyles() {
      const styleElement = document.getElementById("bookcase-global-styles");
      if (styleElement) {
        styleElement.remove();
      }
    },
  },
  mounted() {
    // 加入全域樣式
    this.addGlobalStyles();

    // 初始化場景並開始動畫
    this.init();
    this.animate();

    // ------------------------------------------------------------------
    // 以下對應原本 body 最後兩個 <script>：滑鼠移動產生星星特效、魔杖跟隨效果
    // ------------------------------------------------------------------
    // 星星特效
    document.addEventListener("mousemove", (event) => {
      const star = document.createElement("div");
      star.className = "star";
      const size = Math.random() * 5 + 2;
      const x = event.clientX + (Math.random() * 10 - 5);
      const y = event.clientY + (Math.random() * 10 - 5);

      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${x}px`;
      star.style.top = `${y}px`;

      document.body.appendChild(star);

      setTimeout(() => {
        star.style.opacity = "0";
        setTimeout(() => star.remove(), 1000);
      }, 1000);
    });

    // 魔杖跟隨滑鼠
    const wand = document.createElement("div");
    wand.className = "wand";
    document.body.appendChild(wand);

    document.addEventListener("mousemove", (event) => {
      wand.style.left = `${event.clientX}px`;
      wand.style.top = `${event.clientY}px`;
    });

    // ------------------------------------------------------------------
    // 以下對應原本 body 裡的 document.addEventListener("mousedown", ...) 監聽器
    // 主要是關閉按鈕功能
    // ------------------------------------------------------------------
    document.addEventListener("mousedown", (event) => {
      const elements = document.getElementsByClassName("close-btn");
      for (let i = 0; i < elements.length; i++) {
        const closeBtn = elements[i];
        const rect = closeBtn.getBoundingClientRect();
        // 判斷滑鼠點擊位置是否在 closeBtn 內
        if (
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom
        ) {
          const clickedBtnId = closeBtn.id;
          const index = clickedBtnId.split("-").pop();
          console.log("Button index:", index);

          const parentElement = closeBtn.parentElement;
          if (parentElement) {
            // 只清空父元素的內部 HTML
            parentElement.innerHTML = `
              <img
                src="/src/Assets/img/myBookcase/logo-finall.png"
                style="width:90px;height:90px;margin:35px auto;"
              >
            `;
          }
          break;
        }
      }
    });
  },
  unmounted() {
    // 移除全域樣式
    this.removeGlobalStyles();

    // 清理事件監聽器
    window.removeEventListener("resize", this.onWindowResize);

    // 移除魔杖元素
    const wandElement = document.querySelector(".wand");
    if (wandElement) {
      wandElement.remove();
    }
  },
};
</script>
