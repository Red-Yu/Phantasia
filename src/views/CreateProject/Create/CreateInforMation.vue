<template>
  <div class="inputGroups" :class="{ none: isNone('CreateCover') }">
    <div class="infoGroup">
      <div class="Group ContentIntroduction">
        <h3>Content introduction</h3>
        <div class="inputBox Title">
          <p>Title</p>
          <TextInput v-model="title" :maxLength="10" :rows="1" />
        </div>
        <div class="inputBox Subtitle">
          <p>Subtitle</p>
          <TextInput v-model="subtitle" :maxLength="10" :rows="1" />
        </div>
        <div class="inputBox Summary">
          <p>Summary</p>
          <TextInput v-model="description" :maxLength="1000" :rows="5" />
        </div>
      </div>
      <!--  -->
      <div class="Group AboutTheAuthor">
        <h3>About the author</h3>
        <div class="inputBox Author">
          <p>Title</p>
          <TextInput v-model="author" :maxLength="10" :rows="1" />
        </div>
        <div class="inputBox Illustrator">
          <p>Illustrator</p>
          <TextInput v-model="illustrator" :maxLength="10" :rows="1" />
        </div>
        <!-- <div class="inputBox authorBio">
          <p>Author Bio</p>
          <TextInput :maxLength="300" :rows="5" />
        </div> -->
      </div>
      <!--  -->
      <div class="Group Information">
        <h3>Information</h3>
        <div class="inputBox Publication-Date">
          <p>Publication Date</p>
          <input class="OtherInput" type="date" v-model="dateAdded" />
        </div>
        <div class="inputBox language">
          <p>language</p>
          <select class="OtherInput" name="language" v-model="language">
            <option value="English">English</option>
            <option value="Chinese">Chinese</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Japanese">Japanese</option>
            <option value="Korean">Korean</option>
            <option value="Russian">Russian</option>
            <option value="Italian">Italian</option>
            <option value="Portuguese">Portuguese</option>
          </select>
          <div class="selectIcon">
            <div class="cross">
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
        <div class="inputBox age">
          <p>Suitable Reading Age</p>
          <select class="OtherInput" name="age" v-model="ageGroup">
            <!-- <option value="5">3-5</option>
            <option value="12">5-12</option>
            <option value="16">12-16</option> -->
            <option value="1-6">1-6</option>
            <option value="7-12">7-12</option>
          </select>
          <div class="selectIcon">
            <div class="cross">
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
    </div>
    <!--  -->
    <div class="StepFunction">
      <div class="back">
        <!-- Preview -->
        <router-link to="" class="btnLink dark">
          <div class="icon-M">
            <div class="dark-view"></div>
          </div>
          <p>Live Preview</p>
        </router-link>
        <!-- Design Editor -->
        <router-link to="/Create" class="btnLink dark">
          <div class="icon-M">
            <div class="dark-edit"></div>
          </div>
          <p>Design Editor</p>
        </router-link>
      </div>
      <router-link to="/Create/CreateInfo/CreateConfirm" class="next">
        <div class="btnKey-M dark-border" @click="handleSave">
          <p>Next</p>
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
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TextInput from "../../../components/Input/TextInput.vue";
import { useRoute } from "vue-router";

import {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Pinia store
import { useDocIdStore } from "@/stores/docIdStore"; // 引入 Pinia store

const route = useRoute();
const isNone = (stepName) => {
  return route.name === stepName;
};

// 引入 Pinia store
const docIdStore = useDocIdStore();

// Step 1: 綁定表單資料
const title = ref("");
const subtitle = ref("");
const description = ref("");
const author = ref("");
const illustrator = ref("");
const dateAdded = ref("");
const language = ref("");
const ageGroup = ref("");

// Step 2: 儲存資料到 Firestore
const handleSave = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    alert("Please log in to save the data.");
    return;
  }

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
      title: title.value,
      subtitle: subtitle.value,
      description: description.value,
      author: author.value,
      illustrator: illustrator.value,
      dateAdded: dateAdded.value,
      language: language.value,
      ageGroup: ageGroup.value,
    });

    console.log("Data saved to Firestore!");
    // 如果需要，跳轉到下一頁
    // this.$router.push('/Create/CreateInfo/CreateConfirm');
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};
</script>
