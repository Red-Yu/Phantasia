<style scoped>
/* @import "../../Assets/css/main.css"; */
@import "../../Assets/css/backStageMyColset.css";
</style>

<template>
  <nav class="bkTitle">
    <h2>後台精靈管理</h2>
    <button class="add" @click="openModal">
      <div class="btnKey-M dark">
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
        placeholder="輸入精靈編號或精靈名稱"
        v-model="searchQuery"
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
        <th class="hairTitle">精靈</th>
        <!-- <th class="state">上下架</th> -->
        <th class="renewDate">新增時間</th>
        <th class="preview">預覽</th>
        <th class="delete">刪除</th>
      </tr>
      <th colspan="5" class="textDonload" @click="donloadLink">
        如欲下載測試用素材
        <span>請點擊這裡</span>
      </th>
    </thead>
    <tbody>
      <tr v-for="(item, index) in filteredElfList" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.createdAt.toDate().toLocaleDateString() }}</td>
        <td>
          <div class="preview-container">
            <img
              :src="item.imageUrl"
              alt="預覽"
              class="preview-image partner"
            />
          </div>
        </td>
        <td class="deleteButton">
          <button
            @click="deleteElf(item.id, item.imageUrl, item.order)"
            class="btnKey-M dark"
          >
            刪除
          </button>
        </td>
      </tr>
    </tbody>
  </table>

  <!-- <div class="pagination">
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
  </div> -->

  <!-- 彈窗 -->
  <UploadImageLightBox
    :isVisible="isUploadImageVisible"
    @close="closeModal"
    @uploadImage="uploadImage"
  />
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import UploadImageLightBox from "../../components/backStage/UploadImageLightBox.vue";
import { storage, db } from "../../firebase/firebaseConfig";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

// 儲存精靈資料
const elfList = ref([]);

// 搜尋框的輸入
const searchQuery = ref("");

// 根據搜尋條件過濾精靈
const filteredElfList = computed(() => {
  return (
    elfList.value
      .filter((elf) => {
        // 搜尋條件可以匹配到 order 或 name
        return (
          elf.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          elf.order.toString().includes(searchQuery.value) // 搜尋 order 屬性
        );
      })
      // 根據 order 排序
      .sort((a, b) => a.order - b.order)
  );
});

// 取得精靈資料
const fetchElfData = async () => {
  const querySnapshot = await getDocs(collection(db, "MyClosetElves")); // 這裡使用單一的集合 "MyClosetElves"
  elfList.value = querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
};

// 當頁面加載時獲取資料
onMounted(() => {
  fetchElfData();
});

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

    // 先讀取 Firestore 中的所有精靈資料，計算最大的 order
    const querySnapshot = await getDocs(collection(db, "MyClosetElves"));
    const currentMaxOrder = querySnapshot.docs.length; // 當前最大順序號

    // 新的 order 為當前資料數量（即當前資料長度）+ 1
    const newOrder = currentMaxOrder + 1;

    const storagePath = `myCloset/elf/${file.name}`; // 設置精靈的圖片儲存路徑
    const imageRef = storageRef(storage, storagePath);

    // 上傳圖片
    await uploadBytes(imageRef, file);

    // 獲取圖片的下載 URL
    const downloadURL = await getDownloadURL(imageRef);

    // 保存到 Firestore
    await addDoc(collection(db, "MyClosetElves"), {
      name: imageName,
      fileName: file.name, // 儲存檔案的原始名稱
      imageUrl: downloadURL,
      createdAt: new Date(),
      order: newOrder,
    });

    // 重新獲取資料
    fetchElfData();

    alert("圖片上傳成功！");
    closeModal(); // 關閉彈窗
  } catch (error) {
    console.error("圖片上傳失敗：", error);
    alert("圖片上傳失敗");
  }
};

// 刪除精靈的邏輯
const deleteElf = async (elfId, imageUrl, order) => {
  try {
    // 檢查是否為 order 1~3 的預設樣式
    if (order >= 1 && order <= 5) {
      alert("預設小精靈 (編號 1~5) 不能刪除！");
      return; // 阻止刪除
    }
    // 1. 刪除 Firestore 中的資料
    const elfDocRef = doc(db, "MyClosetElves", elfId);
    await deleteDoc(elfDocRef);
    console.log("Firestore 資料已刪除");

    // 2. 刪除 Storage 中的圖片
    const imageRef = storageRef(storage, imageUrl); // 使用儲存的圖片 URL
    await deleteObject(imageRef);
    console.log("Storage 中的圖片已刪除");

    // 3. 更新頁面上的資料
    elfList.value = elfList.value.filter((item) => item.id !== elfId);
    alert("刪除成功！");
  } catch (error) {
    console.error("刪除操作失敗：", error);
    alert("刪除失敗！");
  }
};

const donloadLink = () => {
  window.open(
    "https://drive.google.com/drive/folders/13PnMXmmUMKdpcX4xA0QmkYF9s01TmFRX?usp=drive_link",
    "_blank"
  ); // 在新頁面中打開
};
</script>
