<template>
  <div>
    <h3>新增會員</h3>
    <form @submit.prevent="addUser">
      <input v-model="newUser.name" placeholder="Name" />
      <input v-model.number="newUser.age" placeholder="age" />
      <input v-model="newUser.email" placeholder="email" />
      <button>Add User</button>
    </form>

    <ul>
      <li v-for="user in users">
        {{ user.name }} -- {{ user.age }} -- {{ user.email }}
        <button @click="updateUserAge(user.id)">Age +1</button>
        <button @click="deleteUser(user.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../../firebase/firebaseConfig";

const users = ref([]);
const newUser = ref({
  name: "",
  age: 18,
  email: "",
});

// 取得會員
const getUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    users.value = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.log(`Error getter users: ${error}`);
  }
};

// 新增會員

const addUser = async () => {
  try {
    await addDoc(collection(db, "users"), newUser.value);
    newUser.value = { name: "", age: 18, email: "" }; // reset
    await getUsers();
  } catch (error) {
    console.log(`Error adding users: ${error}`);
  }
};

const updateUserAge = async (theId) => {
  try {
    const userId = doc(db, "users", theId);
    await updateDoc(userId, {
      age: users.value.find((u) => u.id == theId).age + 1,
    });
    await getUsers();
  } catch (error) {
    console.log(`Error updating age: ${error}`);
  }
};
const deleteUser = async (theId) => {
  try {
    const userId = doc(db, "users", theId);
    await deleteDoc(userId);
    await getUsers();
  } catch (error) {
    console.log(`Error delete user: ${error}`);
  }
};

// 頁面載入時取得會員資料
onMounted(() => {
  getUsers();
});
</script>
