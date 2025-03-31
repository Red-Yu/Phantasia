<template>
  <div class="modal-overlay" v-if="isVisible" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="FullScreenModalBgc"></div>
      <div class="btn-close" @click="closeModal">
        <OpenCloseButton type="plus" color="dark" />
      </div>
      <!-- mainContent -->
      <div class="mainContent">
        <div class="AddCover">
          <div class="coverView">
            <div
              class="side frontSide"
              :style="{ backgroundColor: coverSetting.color }"
            >
              <div v-if="coverSetting.UserCoverImageUrl" class="User-preview">
                <img
                  class="customImg"
                  :src="coverSetting.UserCoverImageUrl"
                  alt="Uploaded in User"
                />
              </div>
              <img
                class="coverImg"
                src="../../../Assets/img/book/封面.png"
                alt=""
              />
            </div>
          </div>
          <div class="coverSetting">
            <div class="FrontCover">
              <div class="titleGroup">
                <p>Front Cover</p>
                <h2>Upload Your Files</h2>
                <div class="subtitle">
                  <span>File should be</span>
                  <span class="spanBold">JPG , PNG , PDF</span>
                </div>
              </div>
              <div class="inputFileGroup">
                <img src="../../../Assets/img/icon/dark-upload.png" />
                <div class="subtitle">
                  <span>Max. file size</span>
                  <span class="spanBold">5MB</span>
                </div>
                <InputImg
                  @update:image="coverSetting.UserCoverImageUrl = $event"
                />
              </div>
            </div>
            <div class="backCover">
              <div class="titleGroup">
                <p>Back Cover</p>
                <h2>Setting The colors</h2>
              </div>
              <ColorPicker
                is-widget
                picker-type="chrome"
                disable-alpha
                disableHistory
                v-model:pureColor="coverSetting.color"
                @change="updateColor"
              />
            </div>
            <router-link
              class="FinishBtn"
              to="/Create/CreateInfo/CreateInforMation"
              @click="closeModal"
            >
              <div class="btnKey-M light" @click="handleSave">
                <p>SAVE</p>
                <div class="icon-L">
                  <div class="white-cross">
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
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useCoverStore } from "@/stores/coverSetting";
import OpenCloseButton from "@/components/BTN/OpenCloseButton.vue";
import InputImg from "@/components/Input/InputImg.vue";
import { ColorPicker } from "vue3-colorpicker";
import "vue3-colorpicker/style.css";

import { useDocIdStore } from "@/stores/docIdStore"; // 引入 Pinia store
import { getAuth } from "firebase/auth";
import {
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const docIdStore = useDocIdStore(); // 使用 Pinia store
//-----------------------------
// fullscreen
//-----------------------------
// 定義 props
const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
});

// 定義 emit 事件
const emit = defineEmits(["close"]);

// 關閉彈窗的方法
const closeModal = () => {
  emit("close");
};

//-----------------------------
// 監聽圖片上傳並暫存 Pinia
//-----------------------------
const coverSetting = useCoverStore();
// const imageUrl = ref(null);

// 監聽圖片上傳，存入 Pinia
// const updateImage = (imageUrl) => {
//   coverSetting.setImageUrl(imageUrl);
// };

// // 監聽顏色變更，存入 Pinia
// const updateColor = (newColor) => {
//   coverSetting.setColor(newColor);
// };

// const coverSetting = useCoverStore();

//將暫存的圖片url轉換成圖片格式
// RGB 顏色轉換為 Hex 格式
function rgbToHex(r, g, b) {
  // 將 R, G, B 值轉換為 16 進位格式，並填充到兩位數
  const toHex = (value) => {
    const hex = value.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return "#" + toHex(r) + toHex(g) + toHex(b);
}

function dataURLToBlob(dataURL) {
  const byteString = atob(dataURL.split(",")[1]);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }
  return new Blob([uint8Array], { type: "image/jpeg" }); // 這裡根據圖片的實際格式（例如 JPEG, PNG）設定 MIME 類型
}
const handleSave = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  // 確認是否有登入
  if (!user) {
    alert("Please log in to save your cover.");
    return;
  }

  // 上傳圖片到 Firebase Storage
  const imageData = coverSetting.UserCoverImageUrl; // 這是從子層接收到的 base64 DataURL
  if (imageData) {
    try {
      // 將 DataURL 轉換為 Blob
      const imageBlob = dataURLToBlob(imageData);

      // 創建自定義檔案名稱（例如：用戶ID + 時間戳）
      const fileName = `cover_${Date.now()}.jpg`;

      // 上傳到 Firebase Storage
      const storage = getStorage();
      const userStorageRef = storageRef(
        storage,
        `images/${user.uid}/${fileName}`
      );

      // 上傳圖片
      const uploadTask = uploadBytesResumable(userStorageRef, imageBlob);

      // 等待上傳完成，獲取下載 URL
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // 可選：顯示上傳進度
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error("Upload failed:", error);
        },
        async () => {
          // 圖片上傳完成，獲取下載 URL
          const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);

          // 取得顏色資料，若沒有顏色則給預設顏色 #EEAD50
          let color = coverSetting.color;
          if (!color || typeof color !== "string" || !color.startsWith("rgb")) {
            // 如果沒有顏色資料或格式不正確，給一個預設顏色
            color = "rgb(238, 173, 80)"; // RGB 格式的預設顏色對應於 #EEAD50
          }

          // 解析 rgb 字符串
          const rgbValues = color.match(/\d+/g);
          if (rgbValues && rgbValues.length === 3) {
            const r = parseInt(rgbValues[0]);
            const g = parseInt(rgbValues[1]);
            const b = parseInt(rgbValues[2]);

            // 檢查是否是有效的 RGB 值
            if (
              r >= 0 &&
              r <= 255 &&
              g >= 0 &&
              g <= 255 &&
              b >= 0 &&
              b <= 255
            ) {
              // 轉換 RGB 顏色為 HEX 格式
              const hexColorCode = rgbToHex(r, g, b);

              // ==================================================================
              // 資玲 --> 修改成更新 (添加) 資料
              // ==================================================================
              // 確保 docId 存在
              const docId = docIdStore.getDocId;
              if (!docId) {
                alert("No document ID found.");
                return;
              }

              // 獲取指定 docId 的文件引用
              const db = getFirestore();
              const bookRef = doc(db, "books", docId); // "books" 是集合名稱，docId 是文件 ID

              try {
                // 更新資料
                await updateDoc(bookRef, {
                  colorCode: hexColorCode, // 儲存 HEX 顏色代碼
                  imagePath: imageUrl, // 儲存圖片 URL
                });

                console.log("Data saved to Firestore!");
                // 如果需要，跳轉到下一頁
                // this.$router.push('/Create/CreateInfo/CreateConfirm');
              } catch (error) {
                console.error("Error adding document: ", error);
              }
              // 關閉彈窗
              closeModal();

              // 如果需要，跳轉至其他頁面
              // router.push("/Create/CreateInfo/CreateInforMation");
            } else {
              console.error("Invalid RGB values:", { r, g, b });
            }
          } else {
            console.error("Invalid RGB string format:", color);
          }
        }
      );
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  } else {
    alert("Please upload an image first.");
  }
};

// ==================================================================
// (舊版) 創建資料 --> 改從前一步 [ 創作 ] 創建資料
// ==================================================================
// // 儲存資料到 Firestore
// const db = getFirestore();
// const booksCollection = collection(db, "books");

// const docRef = await addDoc(booksCollection, {
//   userId: user.uid,
//   colorCode: hexColorCode, // 儲存 HEX 顏色代碼
//   imagePath: imageUrl, // 儲存圖片 URL
// });

// const docId = docRef.id; // 這裡獲取 docId

// console.log("Data saved to Firestore!");

// // 儲存 docId 到 Pinia Store
// docIdStore.setDocId(docId); // 儲存 docId
</script>
