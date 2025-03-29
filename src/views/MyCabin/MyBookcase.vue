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
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { db, auth } from '@/firebase/firebaseConfig'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import * as THREE from 'three'
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js'
import TWEEN from '@tweenjs/tween.js'

// 書櫃初始化
const totalSlots = 100
const slots = ref(Array.from({ length: totalSlots }, () => ({ title: '', cover: null })))
const table = ref([])
const defaultCover = 'logo.png'
const container = ref(null)
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000)
camera.position.z = 3000
let renderer, controls
const objects = []
const targets = { table: [], sphere: [], helix: [], grid: [] }
let isRemoveCloseBtn = false

// 格子位置計算（上 72 格＋下 28 格）
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

// 格式轉換 slot 為 table 用陣列
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

// Firestore 讀取使用者book templateData
async function fetchBooksFromFirestore() {
  const user = auth.currentUser
  if (!user) return

  // 取得 books 集合中屬於該 userId 的文件
  const booksRef = collection(db, 'books')
  const q = query(booksRef, where('userId', '==', user.uid))
  const snapshot = await getDocs(q)

  const books = []
  snapshot.forEach(doc => {
    const data = doc.data()
    // 確保有 templateData 陣列，並取出每筆 template
    if (data.templateData && Array.isArray(data.templateData)) {
      data.templateData.forEach(item => {
        books.push({
          title: item.templateName || '',
          cover: item.templateId || null  // 假設 templateId 是圖片檔名或完整網址
        })
      })
    }
  })

  // 填滿 100 格，沒資料補空白格
  for (let i = 0; i < totalSlots; i++) {
    slots.value[i] = i < books.length ? books[i] : { title: '', cover: null }
  }

  // 轉換格式並初始化書櫃
  table.value = generateTableFromSlots()
  initBookcase()
}

// 書櫃初始化與物件加入場景
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

  const style = document.createElement('style')
  style.textContent = `
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
      0% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.8; transform: scale(1.5); }
      100% { opacity: 0; transform: scale(0.8); }
    }
    .wand {
      position: fixed;
      width: 100px;
      height: auto;
      background: url(${new URL('../../Assets/img/myBookcase/mouse1.jpg', import.meta.url)}) no-repeat center center;
      background-size: contain;
      pointer-events: none;
      transform-origin: bottom right;
      transform: rotate(-45deg);
    }
  `
  document.head.appendChild(style)

  const wand = document.createElement('div')
  wand.className = 'wand'
  document.body.appendChild(wand)

  document.addEventListener('mousemove', e => {
    const star = document.createElement('div')
    star.className = 'star'
    const size = Math.random() * 5 + 2
    star.style.width = `${size}px`
    star.style.height = `${size}px`
    star.style.left = `${e.clientX + Math.random() * 10 - 5}px`
    star.style.top = `${e.clientY + Math.random() * 10 - 5}px`
    document.body.appendChild(star)
    setTimeout(() => {
      star.style.opacity = '0'
      setTimeout(() => star.remove(), 1000)
    }, 1000)

    wand.style.left = `${e.clientX}px`
    wand.style.top = `${e.clientY}px`
  })

  // 補上 closeBtn 點擊事件（🔧 修正）
  document.addEventListener('mousedown', event => {
    const closeBtns = document.getElementsByClassName('close-btn')
    for (let btn of closeBtns) {
      const rect = btn.getBoundingClientRect()
      if (
        event.clientX >= rect.left && event.clientX <= rect.right &&
        event.clientY >= rect.top && event.clientY <= rect.bottom
      ) {
        const parent = btn.parentElement
        if (parent) {
          parent.innerHTML = `
            <img src="${new URL('../../Assets/img/myBookcase/logo.png', import.meta.url)}"
                 style="width:90px;height:90px;margin:35px auto;" />
          `
        }
        break
      }
    }
  })
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

function handleClick(target, isAddCloseBtn) {
  if (isAddCloseBtn) {
    addCloseBtn(true)
  } else {
    removeCloseBtn(false)
  }
  transform(targets[target], 2000)
}

function addCloseBtn(state = true) {
  if (isRemoveCloseBtn !== state) {
    isRemoveCloseBtn = state
    document.querySelectorAll(".close-btn").forEach(btn =>
      btn.classList.remove("close-btn-d-none"))
  }
}

function removeCloseBtn(state = false) {
  if (isRemoveCloseBtn !== state) {
    isRemoveCloseBtn = state
    document.querySelectorAll(".close-btn").forEach(btn =>
      btn.classList.add("close-btn-d-none"))
  }
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
  const style = document.createElement('style')
  style.textContent = `
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
      0% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.8; transform: scale(1.5); }
      100% { opacity: 0; transform: scale(0.8); }
    }
    .wand {
      position: fixed;
      width: 100px;
      height: auto;
      background: url('${new URL('../../Assets/img/myBookcase/mouse1.jpg', import.meta.url)}') no-repeat center center;
      background-size: contain;
      pointer-events: none;
      transform-origin: bottom right;
      transform: rotate(-45deg);
    }
  `
  document.head.appendChild(style)

  const wand = document.createElement('div')
  wand.className = 'wand'
  document.body.appendChild(wand)

  document.addEventListener('mousemove', (event) => {
    wand.style.left = `${event.clientX}px`
    wand.style.top = `${event.clientY}px`

    const star = document.createElement('div')
    star.className = 'star'
    const size = Math.random() * 5 + 2
    star.style.width = `${size}px`
    star.style.height = `${size}px`
    star.style.left = `${event.clientX + Math.random() * 10 - 5}px`
    star.style.top = `${event.clientY + Math.random() * 10 - 5}px`
    document.body.appendChild(star)
    setTimeout(() => {
      star.style.opacity = '0'
      setTimeout(() => star.remove(), 1000)
    }, 1000)
  })

  document.addEventListener('mousedown', (event) => {
    const closeBtns = document.getElementsByClassName('close-btn')
    for (let btn of closeBtns) {
      const rect = btn.getBoundingClientRect()
      if (
        event.clientX >= rect.left && event.clientX <= rect.right &&
        event.clientY >= rect.top && event.clientY <= rect.bottom
      ) {
        const parent = btn.parentElement
        if (parent) {
          parent.innerHTML = `
            <img src="${new URL('../../Assets/img/myBookcase/logo.png', import.meta.url)}"
                 style="width:90px;height:90px;margin:35px auto;" />
          `
        }
        break
      }
    }
  })

  fetchBooksFromFirestore()
})

onBeforeUnmount(() => {
  // alert()
  document.body.style.cursor="auto"
  // const style = document.getElementById('bookcase-global-style')
  // if (style) style.remove()
})
</script>
