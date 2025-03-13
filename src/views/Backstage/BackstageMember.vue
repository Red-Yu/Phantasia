<style>
@import "../../Assets/css/main.css";
@import "../../Assets/css/backStage.css";

</style>

<template>
  <nav class="bkTitle">
    <h2>後台會員管理</h2>
    <div class="searchFunction">
      <input
        class="search"
        name="search"
        type="text"
        placeholder="輸入會員編號或姓名"
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
          <th class="mail">帳號</th>
          <th class="name">姓名</th>
          <th class="phone">手機</th>
          <th class="plan">訂閱方案</th>
          <th class="registrationDate ">創立時間</th>
          <th class="more">檢視更多</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>be22g4533fef255577ea@gmail.com</td>
          <td>Qing Hui, Wang</td>
          <td>0987654321</td>
          <td></td>
          <td>2025.03.03</td>
          <td>MORE</td>
        </tr>
        <tr>
          <td>2</td>
          <td>be22g4533fef255577ea@gmail.com</td>
          <td>Qing Hui, Wang</td>
          <td>0987654321</td>
          <td></td>
          <td>2025.03.03</td>
          <td>MORE</td>
        </tr>
        <tr>
          <td>3</td>
          <td>be22g4533fef255577ea@gmail.com</td>
          <td>Qing Hui, Wang</td>
          <td>0987654321</td>
          <td></td>
          <td>2025.03.03</td>
          <td>MORE</td>
        </tr>
        <tr>
          <td>4</td>
          <td>be22g4533fef255577ea@gmail.com</td>
          <td>Qing Hui, Wang</td>
          <td>0987654321</td>
          <td></td>
          <td>2025.03.03</td>
          <td>MORE</td>
        </tr>
        <tr>
          <td>5</td>
          <td>be22g4533fef255577ea@gmail.com</td>
          <td>Qing Hui, Wang</td>
          <td>0987654321</td>
          <td></td>
          <td>2025.03.03</td>
          <td>MORE</td>
        </tr>
        <tr>
          <td>6</td>
          <td>be22g4533fef255577ea@gmail.com</td>
          <td>Qing Hui, Wang</td>
          <td>0987654321</td>
          <td></td>
          <td>2025.03.03</td>
          <td>MORE</td>
        </tr>
        <tr>
          <td>7</td>
          <td>be22g4533fef255577ea@gmail.com</td>
          <td>Qing Hui, Wang</td>
          <td>0987654321</td>
          <td></td>
          <td>2025.03.03</td>
          <td>MORE</td>
        </tr>
        <tr>
          <td>8</td>
          <td>be22g4533fef255577ea@gmail.com</td>
          <td>Qing Hui, Wang</td>
          <td>0987654321</td>
          <td></td>
          <td>2025.03.03</td>
          <td>MORE</td>
        </tr>
        <tr>
          <td>9</td>
          <td>be22g4533fef255577ea@gmail.com</td>
          <td>Qing Hui, Wang</td>
          <td>0987654321</td>
          <td></td>
          <td>2025.03.03</td>
          <td>MORE</td>
        </tr>
        <tr>
          <td>10</td>
          <td>be22g4533fef255577ea@gmail.com</td>
          <td>Qing Hui, Wang</td>
          <td>0987654321</td>
          <td></td>
          <td>2025.03.03</td>
          <td>MORE</td>
        </tr>
        
        <!-- 使用 v-for 動態渲染每一行資料 -->
        <!-- <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.mail }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.plan }}</td>
          <td>{{ user.registrationDate  }}</td>
          <td><button @click="openLightbox(member)">MORE</button></td>
        </tr> -->


      </tbody>
    </table>
        <!-- MORE--Lightbox -->
    <!-- <div id="lightbox" class="lightbox" v-if="showLightbox">
      <div class="lightbox-content">
        <h2>會員詳細資料</h2>
        <p>姓名: {{ selectedMember.name }}</p>
        <p>註冊日期: {{ selectedMember.registrationDate }}</p>
        <p>電子郵件: {{ selectedMember.email }}</p>
        <p>電話: {{ selectedMember.phone }}</p>
        <p>地址: {{ selectedMember.address }}</p>
      </div>
    </div> -->

    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1"> << </button>
      <button v-for="page in totalPages" :key="page" 
              :class="{ active: currentPage === page }"
              @click="goToPage(page)">
        {{ page }} / 
      </button>
      <button @click="nextPage" :disabled="currentPage === totalPages"> >> </button>
    </div>
</template>


