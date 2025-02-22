<template>
  <div>
    <h2>Todo List</h2>
    <input v-model="task" />
    <button @click="addTask">Submit</button>

    <ol>
      <li v-for="(item, key) in tasks" :key="key" @click="removeTask(key)">
        {{ item.text }}
      </li>
    </ol>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import firebaseServices from "../../firebase/firebaseConfig";
const { database, dbRef, push, onValue, remove } = firebaseServices;

const task = ref("");
const tasks = ref({});

//讀取 Realtime Database
const fetchTasks = () => {
  const tasksRef = dbRef(database, "tasks");

  onValue(tasksRef, (snapshot) => {
    tasks.value = snapshot.val() || {};
  });
};
onMounted(fetchTasks); //掛載完之後就呼叫 fetchTasks()
// 新增 task 到 database
const addTask = () => {
  const tasksRef = dbRef(database, "tasks");
  push(tasksRef, { text: task.value });
  task.value = "";
};

// 從 database 刪除 task
const removeTask = (key) => {
  const tasksRef = dbRef(database, `tasks/${key}`);
  remove(tasksRef);
};
</script>

<style scoped>
ol li {
  background-color: #abc;
  font: 18px Consolas;
  margin: 5px;
  padding: 5px;
  width: 175px;
}
ol li:hover {
  background-color: #cba;
  cursor: pointer;
}
</style>
