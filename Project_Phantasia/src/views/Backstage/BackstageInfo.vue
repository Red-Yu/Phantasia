<style>
@import "../../Assets/css/main.css";
@import "../../Assets/css/backStage.css";

</style>

<template>
  <nav class="bkTitle">
    <h2>後台資訊管理</h2>

    <button class="add">
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
        placeholder="輸入資訊編號"
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
          <th class="infoTitle">資訊標題</th>
          <th class="location">位置</th>
          <th class="type">類別</th>
          <th class="state">上下架</th>
          <th class="renewDate ">最後更新時間</th>
          <th class="more edit">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>歡慶開幕</td>
          <td>最新消息</td>
          <td>優惠</td>
          <td>啟用</td>
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
