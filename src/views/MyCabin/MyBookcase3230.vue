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
// ✅ Vue + Firebase + three.js 必要模組匯入
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { db, auth } from '@/firebase/firebaseConfig'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import * as THREE from 'three'
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js'
import TWEEN from '@tweenjs/tween.js'

// ✅ 書櫃資料設定與預設值
const totalSlots = 100
const slots = ref(Array.from({ length: totalSlots }, () => ({ title: '', cover: null })))
const table = ref([])
const defaultCover = 'logo.png'
const container = ref(null)

// ✅ three.js 場景初始化
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000)
camera.position.z = 3000
let renderer, controls
const objects = []
const targets = { table: [], sphere: [], helix: [], grid: [] }
let isRemoveCloseBtn = false

// ✅ 書櫃格子座標規則（固定100格）
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

// ✅ 轉換 slot 書本資料為排版陣列格式
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

// ✅ 從 Firebase Firestore 抓取書籍資料並依時間排序
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

// ✅ 初始化書格物件，加入場景與互動按鈕
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
    img.src = isUrl ? book.cover : new URL(`../../Assets/img/myBookcase/${book.cover || defaultCover}`, import.meta.url).href
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

  // ✅ 初始化 renderer 與控制器
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

// ✅ 建立其他排版（球狀、螺旋、格子）
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

function handleClick(target, isAddCloseBtn) {
  if (isAddCloseBtn) {
    addCloseBtn(true)
  } else {
    removeCloseBtn(false)
  }
  transform(targets[target], 2000)
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

// ✅ 注入滑鼠特效樣式（星星與魔杖）
function injectMouseEffectStyles() {
  const style = document.createElement('style')
  style.id = 'bookcase-global-style'
  style.textContent = `...` // 省略長樣式
  document.head.appendChild(style)
}

// ✅ 掛載後初始化資料與效果
onMounted(() => {
  document.body.classList.add('my-bookcase')
  injectMouseEffectStyles()

  // 星星特效
  // Handle mousemove event to update wand position
  document.addEventListener('mousemove', (event) => {
    const wand = document.querySelector('.wand')
    if (wand) {
      wand.style.left = `${event.pageX}px`
      wand.style.top = `${event.pageY}px`
    }
  })

// 魔杖圖示
const wand = document.createElement('div')
wand.className = 'wand'
document.body.appendChild(wand)
document.addEventListener('mousemove', (event) => {
  const wand = document.querySelector('.wand')
  if (wand) {
    wand.style.left = `${event.pageX}px`
    wand.style.top = `${event.pageY}px`
  }
})

fetchBooksFromFirestore()
})

// ✅ 離開時移除效果與樣式
onBeforeUnmount(() => {
  document.body.classList.remove('my-bookcase')
  const style = document.getElementById('bookcase-global-style')
  if (style) style.remove()
})
</script>
