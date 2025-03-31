<template>
  <!-- 頂部說明區域 -->
  <div class="directions">
    <div class="directions-title">Published Works Management Guide</div>
    <div class="directions-desc">This section is for viewing information about published works and performing unpublishing
      actions only. To modify a work, please return to the creator's page.</div>
    <div class="CREATE-link" @click="goToCreateStory">
      <p style="font-size: 20px">Back to CREATE STORY</p>
      <div class="i">
        <div class="dark-arrow"></div>
      </div>
    </div>
  </div>
  <!-- 搜尋和移除按鈕區域 -->
  <div class="search-section">
    <div class="search-container">
      <div class="search-input-wrapper">
        <input type="search" class="search-input" placeholder="Search" v-model="searchQuery" required />
        <div class="search-icon"><img :src="search" alt="search" /></div>
      </div>
    </div>
    <div class="remove-button">
      <img :src="remove" alt="remove" />
      <p>Remove</p>
    </div>
  </div>

  <!-- 表格標題 -->
  <p class="table-title">PUBLISHED PROJECTS</p>

  <!-- loading 指示器 -->
  <div v-if="loading" class="loading-indicator">Loading...</div>

  <!-- 項目表格 (始終顯示) -->
  <table class="projects-table">
    <thead>
      <tr>
        <td>Project Name</td>
        <td @click="sortByDate">Date {{ sortDirection === 'asc' ? '∧' : '∨' }}</td>
        <td>Info ∧</td>
      </tr>
    </thead>

    <tbody>
      <tr v-if="filteredBooks.length === 0">
        <td colspan="3" class="no-data-cell">
          No published works found.
        </td>
      </tr>
      <tr v-for="(book, index) in filteredBooks" :key="book.id">
        <td>
          <div class="project-info">
            <div class="project-delete-icon">
              <img :src="projectdeleteicon" alt="delete project" />
            </div>
            <div class="project-image">
              <img :src="book.imageUrl || book.imagePath || projectIcon" alt="project" />
            </div>
            <div class="project-text">
              <div class="project-name">{{ book.title }}</div>
              <div class="project-subtitle">{{ book.subtitle }}</div>
            </div>
          </div>
        </td>
        <td class="project-date">{{ formatDate(book.dateAdded) }}</td>
        <td class="more-info" @click="viewBookDetails(book)">
          More
          <div class="i">
            <div class="dark-view"></div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage'; // 添加Storage相關導入
import { db, auth } from '../../firebase/firebaseConfig'; // 請確保路徑正確
import { useRouter } from 'vue-router'; // 導入路由器
import projectIcon from "@/assets/img/membercenter/project.svg";
import remove from "@/assets/img/membercenter/remove.svg";
import search from "@/assets/img/membercenter/search.svg";
import projectdeleteicon from "@/assets/img/membercenter/projectdeleteicon.svg";

// 初始化路由器
const router = useRouter();
// 初始化Firebase Storage
const storage = getStorage();

// 狀態變數
const books = ref([]);
const loading = ref(true);
const searchQuery = ref('');
const sortDirection = ref('desc'); // 預設降序排列 (最新的在前面)

// 當組件掛載時，從資料庫獲取資料
onMounted(async () => {
  await fetchUserBooks();
});

// 從 Firestore 獲取當前用戶的書籍
const fetchUserBooks = async () => {
  try {
    const currentUser = auth.currentUser;
    
    if (!currentUser) {
      console.error('No user is logged in');
      loading.value = false;
      return;
    }
    
    const userId = currentUser.uid;
    console.log('Current user ID:', userId); // 在控制台輸出當前用戶ID以便調試
    
    // 首先嘗試獲取所有屬於當前用戶的書籍（不考慮published字段）
    let booksQuery = query(
      collection(db, 'books'),
      where('userId', '==', userId)
    );
    
    const querySnapshot = await getDocs(booksQuery);
    const fetchedBooks = [];
    
    // 處理每本書
    for (const doc of querySnapshot.docs) {
      const bookData = doc.data();
      console.log('Book found:', doc.id, bookData); // 輸出找到的每本書
      
      // 如果沒有published字段或者published為true，加入列表
      if (bookData.published === undefined || bookData.published === true) {
        const bookWithId = {
          id: doc.id,
          ...bookData
        };
        
        // 如果有imagePath字段，嘗試獲取可訪問的URL
        if (bookData.imagePath && typeof bookData.imagePath === 'string') {
          try {
            console.log('Original imagePath:', bookData.imagePath);
            
            // 檢查URL格式
            if (bookData.imagePath.includes('firebasestorage.googleapis.com')) {
              // 從URL中提取文件路徑
              const urlParts = bookData.imagePath.split('/o/');
              if (urlParts.length > 1) {
                let filePath = urlParts[1].split('?')[0]; // 獲取文件路徑部分
                filePath = decodeURIComponent(filePath); // URL解碼
                
                console.log('Extracted file path:', filePath);
                
                // 獲取可下載URL
                try {
                  const fileRef = storageRef(storage, filePath);
                  const downloadURL = await getDownloadURL(fileRef);
                  bookWithId.imageUrl = downloadURL;
                  console.log('Got download URL:', downloadURL);
                } catch (urlError) {
                  console.error('Error getting download URL:', urlError);
                  bookWithId.imageUrl = bookData.imagePath; // 備用：使用原始路徑
                }
              } else {
                bookWithId.imageUrl = bookData.imagePath;
              }
            } else {
              bookWithId.imageUrl = bookData.imagePath;
            }
          } catch (error) {
            console.error('Error processing image path:', error);
            bookWithId.imageUrl = bookData.imagePath; // 備用：使用原始路徑
          }
        }
        
        fetchedBooks.push(bookWithId);
      }
    }
    
    // 如果沒有找到書籍，可能用戶ID不匹配，顯示一條調試信息
    if (fetchedBooks.length === 0) {
      console.log('No books found for this user. You might need to check if userId matches.');
    }
    
    books.value = fetchedBooks;
    
    // 按日期排序（如果有日期）
    if (books.value.length > 0) {
      books.value.sort((a, b) => {
        const dateA = a.dateAdded ? new Date(a.dateAdded) : new Date(0);
        const dateB = b.dateAdded ? new Date(b.dateAdded) : new Date(0);
        return dateB - dateA; // 降序排列
      });
    }
  } catch (error) {
    console.error('Error fetching books:', error);
  } finally {
    loading.value = false;
  }
};

// 根據搜尋查詢過濾書籍
const filteredBooks = computed(() => {
  if (!searchQuery.value.trim()) {
    return books.value;
  }
  
  const query = searchQuery.value.toLowerCase();
  return books.value.filter(book => 
    book.title.toLowerCase().includes(query) || 
    book.subtitle.toLowerCase().includes(query)
  );
});

// 格式化日期
const formatDate = (dateValue) => {
  if (!dateValue) return 'N/A';
  
  // 處理不同格式的日期
  let date;
  if (dateValue.toDate) {
    // 如果是 Firestore Timestamp 物件
    date = dateValue.toDate();
  } else if (typeof dateValue === 'string') {
    // 如果是日期字符串
    date = new Date(dateValue);
  } else {
    // 如果是其他格式
    date = new Date(dateValue);
  }
  
  // 只顯示日期部分，不顯示時間 "Nov 18, 2024" 格式
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

// 根據日期排序
const sortByDate = () => {
  sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  books.value.sort((a, b) => {
    const dateA = a.dateAdded?.toDate ? a.dateAdded.toDate() : new Date(a.dateAdded);
    const dateB = b.dateAdded?.toDate ? b.dateAdded.toDate() : new Date(b.dateAdded);
    
    return sortDirection.value === 'asc' 
      ? dateA - dateB
      : dateB - dateA;
  });
};

// 跳轉到創建專案頁面
const goToCreateStory = () => {
  router.push('/CreateProject'); // 修改為您的CreateProject路由路徑
};

// 查看書籍詳情
const viewBookDetails = (book) => {
  console.log('Navigating to product page for book ID:', book.id);
  router.push(`/products/${book.id}`);
};
</script>

<style scoped>
@import "../../Assets/css/main.css";

.directions {
  background-color: #DEE2E6;
  padding: 20px;
  color: #153243;
  margin-bottom: 50px;
  gap: 20px;
}

.directions-title {
  font-family: "Aleo", bold;
  font-size: 24px;
  font-weight: 500;
  margin: 8px 0;
}

.directions-desc {
  font-family: "Fanwood Text", serif;
  font-size: 20px;
  margin-bottom: 20px;
}

.CREATE-link{
  color: #153243;
  text-decoration: none;
  display: block;
  text-align: right;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: right;
  gap: 10px;
  cursor: pointer; /* 添加游標指針樣式 */
}

.search-section {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 44px;
}

.search-container {
  margin: 0 auto;
  border-bottom: 2px solid #153243;
  padding: 8px 0;
  width: 100%;
}

.search-input-wrapper {
  display: flex;
  position: relative;
}

.search-input {
  border: none;          /* 移除邊框 */
  outline: none;         /* 移除點擊時的外框 */
  background: none;      /* 移除背景色 */
  width: 100%;
  color: #999999;
  font-size: 20px;
}

.search-icon {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  pointer-events: none;
}

.remove-button {
  font-family: "Fanwood Text", serif;
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: right;
  color: #EEAD50;
  gap: 15px;
}

.remove-button .img{
  color: #EEAD50;
  height: 24px;
}

.table-title {
  font-family: "Aleo", bold;
  font-size: 24px;
  color: #EEAD50;
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 4px;
  text-align: center;
  margin: 62px 0 13px 0;
}

.projects-table {
  width: 100%;
  font-family: "Fanwood Text";
  font-size: 20px;
  justify-content: space-between;
  gap: 13px;
  border-collapse: separate;
  border-spacing: 0;
}

.projects-table thead {
  border-bottom: 1px solid #7A7A7A;
}

.projects-table thead td {
  color: #EEAD50;
  border-bottom: 1px solid #7A7A7A;
  cursor: pointer;
}

.projects-table thead tr {
  align-items: center;
}

.projects-table tbody tr {
  margin: 13px 0 0 0;
  display: table-row;
  height: 13px;
  vertical-align: middle;
}

.projects-table tbody td {
  margin: 50px 0;
}

.project-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 13px 5px;
  gap: 15px;
  margin: 0 auto;
}

.project-delete-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.project-delete-icon img {
  width: 50px;
  height: 70px;
}

.project-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

.project-name {
  font-family: "Fanwood Text";
  font-variant: small-caps;
  font-size: 28px;
  color: #153243;
  font-weight: 500;
  margin: 0;
}

.project-subtitle {
  font-family: "Fanwood Text";
  font-variant: small-caps;
  font-size: 18px;
  color: #7A7A7A;
  margin: 0;
}

.project-date {
  font-family: "Fanwood Text";
  color: #7A7A7A;
  font-size: 18px;
}

.more-info {
  font-family: "Fanwood Text";
  color: #153243;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
}

.loading-indicator {
  text-align: center;
  padding: 20px;
  font-family: "Fanwood Text";
  font-size: 20px;
  color: #7A7A7A;
}

.no-data-cell {
  text-align: center;
  padding: 40px 0;
  font-family: "Fanwood Text";
  font-size: 20px;
  color: #7A7A7A;
}

.project-image {
  min-width: 100px;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  border-radius: 5px;
  overflow: hidden;
}

.project-image img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
}
</style>