<template>
  <div class="InfoConfirm">
    <div class="InfoGroup">
      <!-- ContentIntroduction -->
      <div class="Group ContentIntroduction">
        <h3>Content introduction</h3>
        <div class="infoDataGroup">
          <InputData
            v-for="ContentInfo in ContentInfos"
            :key="ContentInfo"
            :info="ContentInfo"
          />
        </div>
      </div>

      <!-- AboutTheAuthor -->
      <div class="Group AboutTheAuthor">
        <h3>About the author</h3>
        <InputData
          v-for="AuthorInfo in AuthorInfos"
          :key="AuthorInfo"
          :info="AuthorInfo"
        />
      </div>

      <!-- Information -->
      <div class="Group Information">
        <h3>Information</h3>
        <InputData
          v-for="Information in Informations"
          :key="Information"
          :info="Information"
        />
      </div>
    </div>
    <!--  -->
    <div class="StepFunction">
      <div class="back">
        <router-link
          to="/Create/CreateInfo/CreateInforMation"
          class="btnLink dark"
        >
          <div class="icon-M">
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
          <p>Back</p>
        </router-link>
      </div>
      <div class="next">
        <div class="PublishSuccess" @click="openModal">
          <div class="btnKey-M dark">
            <p>Publish</p>
            <div class="icon-M">
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
        </div>
        <PublishSuccess :isVisible="isModalVisible" modalId="PublishSuccess" @close="closeModal" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useDocIdStore } from "@/stores/docIdStore"; // 引入 Pinia store
import { getFirestore, doc, getDoc } from "firebase/firestore";
import InputData from "../../../components/Input/InfoData.vue";
import PublishSuccess from "../FullScreenModal/PublishSuccess.vue";

// 使用 Pinia store
const docIdStore = useDocIdStore();
const db = getFirestore();
const docId = docIdStore.getDocId; // 獲取 docId

// components 初始狀態
const isModalVisible = ref(false);
// 打開彈窗的方法
const openModal = () => {
  isModalVisible.value = true;
};

// 關閉彈窗的方法
const closeModal = () => {
  isModalVisible.value = false;
};

// 定義顯示內容
const ContentInfos = ref([]);
const AuthorInfos = ref([]);
const Informations = ref([]);

// 組件加載時查詢資料
onMounted(async () => {
  if (docId) {
    const docRef = doc(db, "books", docId); // 根據 docId 查詢 Firestore
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      // 根據 Firestore 中的資料填充
      ContentInfos.value = [
        { id: 1, title: "Title", content: data.title || "" },
        { id: 2, title: "Subtitle", content: data.subtitle || "" },
        { id: 3, title: "Summary", content: data.description || "" },
      ];

      AuthorInfos.value = [
        { id: 4, title: "Author", content: data.author || "" },
        { id: 5, title: "Illustrator", content: data.illustrator || "" },
      ];

      Informations.value = [
        { id: 7, title: "Publication Date", content: data.dateAdded || "" },
        { id: 8, title: "Language", content: data.language || "" },
        { id: 9, title: "Suitable reading age", content: data.ageGroup || "" },
      ];
    } else {
      console.log("No such document!");
    }
  }
});

// // data
// const ContentInfos = [
//   {
//     id: 1,
//     title: "Title",
//     content: "the printing and typesetting industry.",
//   },
//   {
//     id: 2,
//     title: "Subtitle",
//     content:
//       "the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type",
//   },
//   {
//     id: 3,
//     title: "Summary",
//     content:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
//   },
// ];
// const AuthorInfos = [
//   {
//     id: 4,
//     title: "Author ",
//     content: "Lorem Ipsum is simply",
//   },
//   {
//     id: 5,
//     title: "Illustrator",
//     content: "Lorem Ipsum is simply",
//   },
//   // {
//   //   id: 6,
//   //   title: "Author bio",
//   //   content:
//   //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
//   // },
// ];
// const Informations = [
//   {
//     id: 7,
//     title: "Publication Date",
//     content: "2025 / 01 /23",
//   },
//   {
//     id: 8,
//     title: "Language",
//     content: "English (UK)",
//   },
//   {
//     id: 9,
//     title: "Suitable reading age",
//     content: "1-6",
//   },
// ];
</script>
