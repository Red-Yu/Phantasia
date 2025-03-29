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
      <!-- 按鈕選單 -->
      <button class="btnKey-M dark" @click="handleClick('helix', false)">HELIX</button>
      <button class="btnKey-M dark" @click="handleClick('table', true)">EDIT</button>
      <button class="btnKey-M dark" @click="handleClick('sphere', false)">SPHERE</button>
      <button class="btnKey-M dark" @click="handleClick('grid', false)">GRID</button>
    </div>
  </div>
</template>

<script setup>
// Vue + Router + Firebase 基礎
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { db, auth } from '@/firebase/firebaseConfig'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'

// three.js 與動畫/控制元件
import * as THREE from 'three'
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js'
import TWEEN from '@tweenjs/tween.js'

// 書櫃資料設定
const totalSlots = 100
const slots = ref(Array.from({ length: totalSlots }, () => ({ title: '', cover: null })))
const table = ref([])
const defaultCover = 'logo.png'
const container = ref(null)

// 建立 three.js 場景 + 相機 + 控制器
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000)
camera.position.z = 3000
let renderer, controls
const objects = []
const targets = { table: [], sphere: [], helix: [], grid: [] }
let isRemoveCloseBtn = false

// 固定 100 格書櫃格子位置（上72格 + 下28格）
function getFixedSlotPositions() {
  const pos = []
  for (let y = 3; y <= 6; y++) {
    for (let x = 1; x <= 18; x++) {
      pos.push({ x, y })
    }
  }
  for (let y = 9; y <= 10; y++) {
    for (let x = 3; x <= 16; x++) {
      pos.push({ x, y })
    }
  }
  return pos
}

// 從網址擷取檔名（支援外部書封）
function extractFileName(url) {
  try {
    return url.split('/').pop().split('.')[0]
  } catch {
    return defaultCover
  }
}

// 依照 slot 資料格式轉換為 table 陣列結構
function generateTableFromSlots() {
  const result = []
  const positions = getFixedSlotPositions()
  for (let i = 0; i < totalSlots; i++) {
    const book = slots.value[i]
    const pos = positions[i]
    const coverName = book.cover ? book.cover : defaultCover
    result.push(coverName, '', book?.title ?? '', pos.x, pos.y)
  }
  return result
}

// 從 Firestore 抓使用者書籍資料，依 createdAt 遞增排序
async function fetchBooksFromFirestore() {
  const user = auth.currentUser
  if (!user) return
  const shelfRoot = collection(db, 'shelf')
  const shelfSnapshot = await getDocs(query(shelfRoot, where('userID', '==', user.uid)))
  let userDocID = user.uid
  if (!shelfSnapshot.empty) {
    userDocID = shelfSnapshot.docs[0].id
  }
  const bookRef = collection(db, `shelf/${userDocID}/book`)
  const q = query(bookRef, orderBy('createdAt', 'asc'))
  const snapshot = await getDocs(q)
  const books = []
  snapshot.forEach(doc => books.push(doc.data()))
  for (let i = 0; i < totalSlots; i++) {
    slots.value[i] = i < books.length ? books[i] : { title: '', cover: null }
  }
  table.value = generateTableFromSlots()
  initBookcase()
}

// 初始化 3D 書櫃，建立每本書的 DOM 元素 → CSS3DObject → 場景物件
function initBookcase() {
  const position = getFixedSlotPositions()
  for (let i = 0; i < totalSlots; i++) {
    const book = slots.value[i]
    const pos = position[i]
    const element = document.createElement('div')
    element.className = 'element'

    const symbol = document.createElement('div')
    symbol.className = 'symbol'
    const img = document.createElement('img')
    const isUrl = book.cover && book.cover.startsWith('http')
    img.src = isUrl ? book.cover : new URL(`../../Assets/img/myBookcase/ ${book.cover || defaultCover}`, import.meta.url).href + 
    symbol.appendChild(img)
    element.appendChild(symbol)

    const details = document.createElement('div')
    details.className = 'details'
    details.innerHTML = `${book.title}`
    element.appendChild(details)

    const closeBtn = document.createElement("div")
    closeBtn.id = `close-btn-${i}`
    closeBtn.className = "close-btn close-btn-d-none"
    closeBtn.textContent = "×"
    element.appendChild(closeBtn)

    const objectCSS = new CSS3DObject(element)
    objectCSS.position.x = pos.x * 140 - 1330
    objectCSS.position.y = -(pos.y * 180) + 990
    objectCSS.position.z = 0
    scene.add(objectCSS)
    objects.push(objectCSS)

    const object = new THREE.Object3D()
    object.position.copy(objectCSS.position)
    targets.table.push(object)
  }

  // 初始化渲染器與控制器
  renderer = new CSS3DRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  container.value.appendChild(renderer.domElement)


  controls = new TrackballControls(camera, renderer.domElement)
  controls.minDistance = 500
  controls.maxDistance = 6000
  controls.addEventListener('change', render)

  createLayouts()
  transform(targets.table, 2000)
  animate()
}

function createLayouts() {
  const vector = new THREE.Vector3()
  for (let i = 0; i < objects.length; i++) {
    const phi = Math.acos(-1 + (2 * i) / objects.length)
    const theta = Math.sqrt(objects.length * Math.PI) * phi
    const objectSphere = new THREE.Object3D()
    objectSphere.position.setFromSphericalCoords(900, phi, theta)
    vector.copy(objectSphere.position).multiplyScalar(2)
    objectSphere.lookAt(vector)
    targets.sphere.push(objectSphere)

    const thetaHelix = i * 0.28 + Math.PI
    const yHelix = -(i * 8) + 450
    const objectHelix = new THREE.Object3D()
    objectHelix.position.setFromCylindricalCoords(1200, thetaHelix, yHelix)
    vector.set(objectHelix.position.x * 2, objectHelix.position.y, objectHelix.position.z * 2)
    objectHelix.lookAt(vector)
    targets.helix.push(objectHelix)

    const objectGrid = new THREE.Object3D()
    objectGrid.position.x = (i % 5) * 400 - 800
    objectGrid.position.y = -(Math.floor(i / 5) % 5) * 400 + 800
    objectGrid.position.z = Math.floor(i / 25) * 1000 - 2000
    targets.grid.push(objectGrid)
  }
}

function transform(targets, duration) {
  TWEEN.removeAll()
  for (let i = 0; i < objects.length; i++) {
    const object = objects[i]
    const target = targets[i]
    new TWEEN.Tween(object.position)
      .to({ x: target.position.x, y: target.position.y, z: target.position.z }, duration)
      .easing(TWEEN.Easing.Exponential.InOut)
      .start()
    new TWEEN.Tween(object.rotation)
      .to({ x: target.rotation?.x || 0, y: target.rotation?.y || 0, z: target.rotation?.z || 0 }, duration)
      .easing(TWEEN.Easing.Exponential.InOut)
      .start()
  }
  new TWEEN.Tween({}).to({}, duration).onUpdate(render).start()
}

function addCloseBtn(state = true) {
  if (isRemoveCloseBtn !== state) {
    isRemoveCloseBtn = state
    document.querySelectorAll(".close-btn").forEach(btn => btn.classList.remove("close-btn-d-none"))
  }
}

function removeCloseBtn(state = false) {
  if (isRemoveCloseBtn !== state) {
    isRemoveCloseBtn = state
    document.querySelectorAll(".close-btn").forEach(btn => btn.classList.add("close-btn-d-none"))
  }
}
function handleClick(target, isAddCloseBtn) {
  if (isAddCloseBtn) {
    addCloseBtn(true)
  } else {
    removeCloseBtn(false)
  }
  transform(targets[target], 2000)
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  render()
}

function animate() {
  requestAnimationFrame(animate)
  TWEEN.update()
  controls?.update()
  renderer.render(scene, camera)
}


function render() {
  renderer.render(scene, camera)
}

onMounted(() => {
  addGlobalStyles()
  fetchBooksFromFirestore()
  animate()

  const handleMouseMove = event => {
    const star = document.createElement('div')
    star.className = 'star'
    const size = Math.random() * 5 + 2
    const x = event.clientX + (Math.random() * 10 - 5)
    const y = event.clientY + (Math.random() * 10 - 5)
    star.style.width = `${size}px`
    star.style.height = `${size}px`
    star.style.left = `${x}px`
    star.style.top = `${y}px`
    document.body.appendChild(star)
    setTimeout(() => {
      star.style.opacity = '0'
      setTimeout(() => star.remove(), 1000)
    }, 1000)
  }

  document.addEventListener('mousemove', handleMouseMove)

  const wand = document.createElement('div')
  wand.className = 'wand'
  document.body.appendChild(wand)
  document.addEventListener('mousemove', event => {
    wand.style.left = `${event.clientX}px`
    wand.style.top = `${event.clientY}px`
})

const handleMouseDown = event => {
    const elements = document.getElementsByClassName('close-btn')
    for (let i = 0; i < elements.length; i++) {
      const closeBtn = elements[i]
      const rect = closeBtn.getBoundingClientRect()
      if (
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
      ) {
        const parentElement = closeBtn.parentElement
        if (parentElement) {
          parentElement.innerHTML = `
            <img
              src="/src/Assets/img/myBookcase/logo-finall"
              style="width:90px;height:90px;margin:35px auto;"
            >`
        }
        break
      }
    }
  }

  window.addEventListener('resize', onWindowResize)
  document.addEventListener('mousedown', handleMouseDown)

  onBeforeUnmount(() => {
    removeGlobalStyles()
    window.removeEventListener('resize', onWindowResize)
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mousedown', handleMouseDown)
    const wandElement = document.querySelector('.wand')
    if (wandElement) wandElement.remove()
  })
})

function addGlobalStyles() {
  const styleElement = document.createElement('style')
  styleElement.id = 'bookcase-global-style'
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
      background-image: url("${new URL("../../Assets/img/myBookcase/bookcaseBg.png", import.meta.url)}");
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
      background: url("${new URL("../../Assets/img/myBookcase/mouse1.jpg", import.meta.url)}") no-repeat center center;
      background-size: contain;
      pointer-events: none;
      transform-origin: bottom right;
      transform: rotate(-45deg);
    }
  `
  document.head.appendChild(styleElement)
}

function removeGlobalStyles() {
  const styleElement = document.getElementById('bookcase-global-style')
  if (styleElement) {
    styleElement.remove()
  }
}


</script>
