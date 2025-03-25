<style scoped>
/* @import "../../Assets/css/main.css"; */
@import "../../Assets/css/backStageMyColset.css";
</style>

<template>
  <nav class="bkTitle">
    <h2>後台髮型管理</h2>

    <div class="toggle-container btnKey-M dark">
      <span :class="{ active: gender === '男' }">男</span>
      <label class="switch">
        <input type="checkbox" v-model="isFemale" />
        <span class="slider"></span>
      </label>
      <span :class="{ active: gender === '女' }">女</span>
    </div>
    <button class="add">
      <div class="btnKey-M dark" @click="openModal">
        <p>新增</p>
        <div class="icon-M addIcon">
          <div class="white-plus"></div>
        </div>
      </div>
    </button>

    <div class="searchFunction">
      <input
        class="search"
        name="search"
        type="text"
        placeholder="輸入髮型編號或髮型名稱"
      />
      <div class="icon-M searchIcon">
        <div class="dark-search"></div>
      </div>
    </div>
  </nav>

  <table class="member">
    <thead>
      <tr>
        <th class="id">編號</th>
        <th class="hairTitle">髮型</th>
        <!-- <th class="state">上下架</th> -->
        <th class="renewDate">新增時間</th>
        <th class="preview">預覽</th>
        <th class="delete">刪除</th>
      </tr>
    </thead>
    <tbody>
      <!-- 使用 v-for 渲染資料 -->
      <tr v-for="(item, index) in hairList" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.createdAt.toDate().toLocaleDateString() }}</td>
        <td>
          <div class="preview-container">
            <img :src="item.imageUrl" alt="預覽" class="preview-image hair" />
          </div>
        </td>
        <td class="deleteButton">
          <button class="btnKey-M dark">刪除</button>
        </td>
      </tr>
    </tbody>
  </table>

  <div class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1"><<</button>
    <button
      v-for="page in totalPages"
      :key="page"
      :class="{ active: currentPage === page }"
      @click="goToPage(page)"
    >
      {{ page }} /
    </button>
    <button @click="nextPage" :disabled="currentPage === totalPages">>></button>
  </div>

  <!-- 彈窗 -->
  <UploadImageLightBox
    :isVisible="isUploadImageVisible"
    @close="closeModal"
    @uploadImage="uploadImage"
  />
</template>

<script setup>
import { computed, ref, onMounted, watch } from "vue";
import UploadImageLightBox from "../../components/backStage/UploadImageLightBox.vue";
import { storage, db } from "../../firebase/firebaseConfig";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { collection, addDoc, getDocs } from "firebase/firestore";

// 控制性別切換的狀態
const isFemale = ref(false);
const gender = computed(() => (isFemale.value ? "女" : "男"));

// 儲存髮型資料
const hairList = ref([]);

// 根據性別抓取資料
const fetchHairData = async () => {
  const collectionName =
    gender.value === "男" ? "MyClosetMaleHair" : "MyClosetFemaleHair"; // 根據性別選擇 Firestore 集合
  const querySnapshot = await getDocs(collection(db, collectionName));

  // 清空資料並加載新資料
  hairList.value = querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
};

// 當頁面加載時獲取資料
onMounted(() => {
  fetchHairData();
});

// 監聽 gender 的變化並重新抓取資料
watch(gender, () => {
  fetchHairData();
});

// 上下架狀態
// const isOn = ref(false);
// const state = computed(() => (isOn.value ? "下架" : "上架"));

// 控制彈窗顯示
const isUploadImageVisible = ref(false);

// 打開彈窗的方法
const openModal = () => {
  isUploadImageVisible.value = true;
};

// 關閉彈窗的方法
const closeModal = () => {
  isUploadImageVisible.value = false;
};

// 上傳圖片的邏輯
const uploadImage = async ({ file, imageName }) => {
  try {
    if (!imageName || !file) {
      alert("請選擇圖片並輸入名稱！");
      return; // 確保圖片名稱和檔案都存在
    }

    // 判斷目前性別並構建路徑
    const genderPath = gender.value === "男" ? "male" : "female"; // 使用 gender.value 取得性別的實際值
    const storagePath = `myCloset/hair/${genderPath}/${file.name}`; // 動態設置存儲路徑
    const firestoreCollection =
      gender.value === "男" ? "MyClosetMaleHair" : "MyClosetFemaleHair"; // 根據性別選擇 Firestore 集合

    // 創建圖片儲存路徑
    const imageRef = storageRef(storage, storagePath);

    // 上傳圖片
    await uploadBytes(imageRef, file);

    // 獲取圖片的下載 URL
    const downloadURL = await getDownloadURL(imageRef);

    // 保存到 Firestore
    await addDoc(collection(db, firestoreCollection), {
      name: imageName,
      imageUrl: downloadURL,
      createdAt: new Date(),
    });

    alert("圖片上傳成功！");
    closeModal(); // 關閉彈窗
  } catch (error) {
    console.error("圖片上傳失敗：", error);
    alert("圖片上傳失敗");
  }
};
</script>
