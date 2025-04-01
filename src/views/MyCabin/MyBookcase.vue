<style scoped>
@import "../../Assets/css/myBookcase.css";
</style>

<template>
  <div>
    <div id="info">
      <a href="https://threejs.org" target="_blank" rel="noopener"></a>
    </div>
    <div id="container" ref="container"></div>
    <div id="menu">
      <button class="btnKey-M dark" @click="handleClick('helix', false)">
        HELIX
      </button>
      <button class="btnKey-M dark" @click="handleClick('table', true)">
        EDIT
      </button>
      <button class="btnKey-M dark" @click="handleClick('sphere', false)">
        SPHERE
      </button>
      <button class="btnKey-M dark" @click="handleClick('grid', false)">
        GRID
      </button>
    </div>
    <div class="backToHome_button">
      <button
        @click="backToHome"
        class="btnLink whiteForFrontPage backToHome menuIn"
      >
        Back to my Cabin
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import { useRouter, onBeforeRouteLeave } from "vue-router";
import { db, auth } from "@/firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  updateDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import * as THREE from "three";
import {
  CSS3DRenderer,
  CSS3DObject,
} from "three/examples/jsm/renderers/CSS3DRenderer.js";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";
import TWEEN from "@tweenjs/tween.js";

const totalSlots = 100;
const slots = ref(
  Array.from({ length: totalSlots }, () => ({ title: "", cover: null }))
);
const defaultCover = "logo.png";
const container = ref(null);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  1,
  10000
);
camera.position.z = 2000;
let renderer, controls;
const objects = [];
const targets = { table: [], sphere: [], helix: [], grid: [] };
let isRemoveCloseBtn = false;
const isAutoRotating = ref(true);
let autoRotateId;
const router = useRouter();
function backToHome() {
  router.push("/MyCabin");
}

function getFixedSlotPositions() {
  const pos = [];
  for (let y = 3; y <= 6; y++) {
    for (let x = 1; x <= 18; x++) {
      pos.push({ x, y });
    }
  }
  for (let y = 9; y <= 10; y++) {
    for (let x = 3; x <= 16; x++) {
      pos.push({ x, y });
    }
  }
  return pos;
}

function generateTableFromSlots() {
  const result = [];
  const positions = getFixedSlotPositions();
  for (let i = 0; i < totalSlots; i++) {
    const book = slots.value[i];
    const pos = positions[i];
    const coverName = book.cover ? book.cover : defaultCover;
    result.push(coverName, "", book?.title ?? "", pos.x, pos.y);
  }
  return result;
}

function autoRotate() {
  if (isAutoRotating.value) {
    scene.rotation.y += 0.002;
    autoRotateId = requestAnimationFrame(autoRotate);
  }
}

async function fetchBooksFromFirestoreAndSaveToMyBookcase() {
  // const user = auth.currentUser;
  // if (!user) return;
  // const booksRef = collection(db, "books");
  // const q = query(booksRef, where("userId", "==", user.uid));
  // const snapshot = await getDocs(q);
  // console.log(snapshot, "snapshot");

  // const extractedBooks = [];
  // snapshot.forEach((docSnap) => {
  //   const data = docSnap.data();
  //   if (Array.isArray(data.templateData)) {
  //     data.templateData.forEach((item) => {
  //       extractedBooks.push({
  //         title: item.title || "",
  //         cover: item.imagePath || null,
  //       });
  //     });
  //   }
  // });
  const placeholders = [
    "1.png",
    "2.png",
    "3.png",
    "4.png",
    "5.png",
    "6.png",
    "7.png",
    "8.png",
  ];
  for (let i = 0; i < totalSlots; i++) {
    // if (i < extractedBooks.length) {
    //   slots.value[i] = extractedBooks[i];
    // } else {
    const idx = i % placeholders.length;
    slots.value[i] = { title: "Collectable", cover: placeholders[idx] };
    // }
  }
  // const userRef = doc(db, "users", user.uid);
  // await updateDoc(userRef, { MyBookcase: extractedBooks });
}

function handleClick(target, isAddCloseBtn) {
  cancelAnimationFrame(autoRotateId);
  isAutoRotating.value = false;
  if (isAddCloseBtn) addCloseBtn(true);
  else removeCloseBtn(false);

  if (target === "helix" || target === "sphere") {
    isAutoRotating.value = true;
    autoRotate();
  }

  if (isAddCloseBtn) addCloseBtn(true);
  else removeCloseBtn(false);

  transform(targets[target], 2000);
}

function transform(targets, duration) {
  TWEEN.removeAll();
  for (let i = 0; i < objects.length; i++) {
    const object = objects[i];
    const target = targets[i];
    new TWEEN.Tween(object.position)
      .to(
        { x: target.position.x, y: target.position.y, z: target.position.z },
        duration
      )
      .easing(TWEEN.Easing.Exponential.InOut)
      .start();
    new TWEEN.Tween(object.rotation)
      .to(
        {
          x: target.rotation?.x || 0,
          y: target.rotation?.y || 0,
          z: target.rotation?.z || 0,
        },
        duration
      )
      .easing(TWEEN.Easing.Exponential.InOut)
      .start();
  }
  new TWEEN.Tween({}).to({}, duration).onUpdate(render).start();
}

function addCloseBtn(state = true) {
  if (isRemoveCloseBtn !== state) {
    isRemoveCloseBtn = state;
    document
      .querySelectorAll(".close-btn")
      .forEach((btn) => btn.classList.remove("close-btn-d-none"));
  }
}

function removeCloseBtn(state = false) {
  if (isRemoveCloseBtn !== state) {
    isRemoveCloseBtn = state;
    document
      .querySelectorAll(".close-btn")
      .forEach((btn) => btn.classList.add("close-btn-d-none"));
  }
}

let cursorEffectHandler;

function initCursorEffect() {
  cursorEffectHandler = (e) => {
    const star = document.createElement("div");
    const size = Math.random() * 5 + 2;
    Object.assign(star.style, {
      position: "fixed",
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: "rgba(255,255,255,0.9)",
      borderRadius: "50%",
      pointerEvents: "none",
      boxShadow: "0 0 10px rgba(6, 220, 244, 0.9)",
      left: `${e.clientX + Math.random() * 10 - 5}px`,
      top: `${e.clientY + Math.random() * 10 - 5}px`,
      transform: "translate(-50%, -50%)",
      animation: "twinkle 1s ease-out forwards",
      zIndex: 9998,
    });

    document.body.appendChild(star);
    setTimeout(() => star.remove(), 1000);
  };

  document.addEventListener("mousemove", cursorEffectHandler);

  const starStyle = document.createElement("starStyle");
  starStyle.textContent = `
    @keyframes twinkle {
      0% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.8; transform: scale(1.5); }
      100% { opacity: 0; transform: scale(0.8); }
    }
  `;
  document.head.appendChild(starStyle);
}

function render() {
  renderer.render(scene, camera);
}

function animate() {
  requestAnimationFrame(animate);
  TWEEN.update();
  controls?.update();
  render();
}

function initBookcase() {
  const positions = getFixedSlotPositions();
  console.log(totalSlots);

  for (let i = 0; i < totalSlots; i++) {
    const book = slots.value[i];
    const pos = positions[i];
    const element = document.createElement("div");
    element.className = "element";
    const symbol = document.createElement("div");
    symbol.className = "symbol";
    const img = document.createElement("img");
    const isUrl = book.cover && book.cover.startsWith("http");
    // console.log(book);

    // console.log(book.cover);

    img.src = isUrl
      ? book.cover
      : `/tid201/g1/img/myBookcase/${book.cover || defaultCover}`;

    img.onerror = () => {
      img.src = `/tid201/g1/img/myBookcase/${defaultCover}`;
    };
    symbol.appendChild(img);
    element.appendChild(symbol);
    const details = document.createElement("div");
    details.className = "details";
    details.innerHTML = `${book.title}`;
    element.appendChild(details);

    //關閉按鈕
    const closeBtn = document.createElement("div");
    closeBtn.id = `close-btn-${i}`;
    closeBtn.className = "close-btn close-btn-d-none";
    closeBtn.textContent = "×";
    element.appendChild(closeBtn);

    //點擊後切換圖片
    closeBtn.addEventListener("click", () => {
      img.src = `/tid201/g1/img/myBookcase/${defaultCover}`;
    });

    const objectCSS = new CSS3DObject(element);
    objectCSS.position.x = pos.x * 140 - 1330;
    objectCSS.position.y = -(pos.y * 180) + 990;
    objectCSS.position.z = 0;
    scene.add(objectCSS);
    objects.push(objectCSS);

    const obj = new THREE.Object3D();
    obj.position.copy(objectCSS.position);
    targets.table.push(obj);
  }

  renderer = new CSS3DRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.value.appendChild(renderer.domElement);

  controls = new TrackballControls(camera, renderer.domElement);
  controls.minDistance = 500;
  controls.maxDistance = 6000;
  controls.addEventListener("change", render);

  createLayouts();
  animate();
}

function createLayouts() {
  const vector = new THREE.Vector3();
  for (let i = 0; i < objects.length; i++) {
    const phi = Math.acos(-1 + (2 * i) / objects.length);
    const theta = Math.sqrt(objects.length * Math.PI) * phi;
    const sphereObj = new THREE.Object3D();
    sphereObj.position.setFromSphericalCoords(900, phi, theta);
    vector.copy(sphereObj.position).multiplyScalar(2);
    sphereObj.lookAt(vector);
    targets.sphere.push(sphereObj);

    const thetaHelix = i * 0.28 + Math.PI;
    const yHelix = -(i * 8) + 450;
    const helixObj = new THREE.Object3D();
    helixObj.position.setFromCylindricalCoords(1200, thetaHelix, yHelix);
    vector.set(
      helixObj.position.x * 2,
      helixObj.position.y,
      helixObj.position.z * 2
    );
    helixObj.lookAt(vector);
    targets.helix.push(helixObj);

    const gridObj = new THREE.Object3D();
    gridObj.position.x = (i % 5) * 400 - 800;
    gridObj.position.y = -(Math.floor(i / 5) % 5) * 400 + 800;
    gridObj.position.z = Math.floor(i / 25) * 1000 - 2000;
    targets.grid.push(gridObj);
  }
}

function handleMouseDown(event) {
  const elements = document.getElementsByClassName("close-btn");
  for (let i = 0; i < elements.length; i++) {
    const closeBtn = elements[i];
    const rect = closeBtn.getBoundingClientRect();
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
        parentElement.innerHTML = `
          <img
            src="/tid201/g1/img/myBookcase/logo.png"
            style="width:90px;height:90px;margin:35px auto;"
          >
        `;
      }
      break;
    }
  }
}

onMounted(async () => {
  initCursorEffect();
  await fetchBooksFromFirestoreAndSaveToMyBookcase();
  initBookcase();
  transform(targets.helix, 2000);
  autoRotate();

  document.addEventListener("mousedown", handleMouseDown);
});

// onBeforeUnmount(() => {
//   // cancelAnimationFrame(autoRotateId);
//   // document.removeEventListener("mousedown", handleMouseDown);
//   // document.removeEventListener("mousemove", handleMouseMove);
//   // document.removeEventListener("mousemove", initCursorEffect);
// });

onBeforeRouteLeave(() => {
  cancelAnimationFrame(autoRotateId);

  // 移除光標效果的事件監聽器
  if (cursorEffectHandler) {
    document.removeEventListener("mousemove", cursorEffectHandler);
  }

  // 移除 @keyframes twinkle 樣式
  const styleTag = document.querySelector("starStyle");
  if (styleTag) {
    styleTag.remove();
  }

  // 清除所有的 TWEEN 動畫
  TWEEN.removeAll();

  // 清理 Three.js 渲染器的 DOM 元素和資源
  if (renderer && renderer.domElement) {
    renderer.domElement.remove();
  }

  // 清理場景中的所有物件
  scene.children.forEach((child) => {
    if (child instanceof THREE.Mesh || child instanceof THREE.Object3D) {
      // 釋放幾何體資源
      if (child.geometry) {
        child.geometry.dispose();
      }

      // 釋放材質資源
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((mat) => {
            if (mat && mat.dispose) {
              mat.dispose();
            }
          });
        } else {
          if (child.material.dispose) {
            child.material.dispose();
          }
        }
      }
    }
    scene.remove(child);
  });

  // 清除控制器資源
  if (controls) {
    controls.dispose();
  }

  // 移除事件監聽器
  document.removeEventListener("mousedown", handleMouseDown);

  // 清除 DOM 元素
  objects.forEach((object) => {
    if (object.element) {
      object.element.remove();
    }
  });
  objects.length = 0; // 清空 objects 陣列
});
</script>
