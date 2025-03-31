import { defineStore } from "pinia";
import { reactive, shallowRef } from "vue";
// 截圖
import html2canvas from 'html2canvas';
// 模板映射
import TemplateBox1 from "@/components/TemplateBoxes/TemplateBox1.vue";
import TemplateBox2 from "@/components/TemplateBoxes/TemplateBox2.vue";
import TemplateBox3 from "@/components/TemplateBoxes/TemplateBox3.vue";
import TemplateBox4 from "@/components/TemplateBoxes/TemplateBox4.vue";
import TemplateBox5 from "@/components/TemplateBoxes/TemplateBox5.vue";
import TemplateBox6 from "@/components/TemplateBoxes/TemplateBox6.vue";
import TemplateBox7 from "@/components/TemplateBoxes/TemplateBox7.vue";
import TemplateBox8 from "@/components/TemplateBoxes/TemplateBox8.vue";
// id 創建相關
import { nanoid } from 'nanoid';
import { getAuth } from "firebase/auth";
// firebase 相關
import { useDocIdStore } from "@/stores/docIdStore"; // 引入 Pinia store
import { getFirestore, collection, addDoc , doc, getDoc ,setDoc } from "firebase/firestore";
import {
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";


// ===============
// 模板 store，用來存放選中的模板組件
// ===============

export const useTemplateStore = defineStore("template", () => {
  // -----------------------
  // 映射 -> templateName 
  // -----------------------
  const templateMapping = {
    'TemplateBox1': TemplateBox1, 
    'TemplateBox2': TemplateBox2,  
    'TemplateBox3': TemplateBox3,  
    'TemplateBox4': TemplateBox4,  
    'TemplateBox5': TemplateBox5,  
    'TemplateBox6': TemplateBox6,  
    'TemplateBox7': TemplateBox7,  
    'TemplateBox8': TemplateBox8,  
  };
  
    function getTemplateComponent(templateName) {
      return templateMapping[templateName] || null;  // 如果未找到對應組件，返回 null 或者預設組件
    }


  // -----------------------
  // 儲存專案名稱 -> storyName 
  // -----------------------
  const storyName = reactive({ name: '' }); // 儲存專案名稱

    function setStoryName(name) {
      storyName.name = name; 
    }

  // -----------------------
  // 儲存所有模板 -> templates 
  // -----------------------
  const templates = reactive([]);
  
    // ----{{ addTemplate }}
    function addTemplate(templateComponent, templateData = {}) {
      
      const templateName = templateComponent.name;

      if (templates.length < 12) {
        const clonedTemplate = {
          component: shallowRef(templateComponent),      // 存儲組件
          data: {
            templateName,                                // 模板名稱
            templateId: nanoid(),                        // 給文字樣式判斷用 (各模板的唯一ID) 在個模板設定
            ...JSON.parse(JSON.stringify(templateData)), // 深拷貝數據
          }
      };
      // console.log("原始 templateComponent:", templateComponent);
      console.log("拷貝後 clonedTemplate:",clonedTemplate );
      console.log("templateData:", templateData);  // 加入 log 檢查 templateData 的結構
      templates.push(clonedTemplate);
      }
    }

    // ----{{ 更新模板(回傳)數據 }}
    function updateTemplateData(i, newData) {
      if (templates[i]) {
        templates[i].data = { ...templates[i].data, ...newData };
        // console.log(`模板 ${i} 更新後的數據:`, templates[index]); 
      }
    }

    // ----{{ 刪除模板 }}
    function removeTemplate(i) {
      if (templates[i]) {
        templates.splice(i, 1);
      }
    }

    // ----{{ 清空模板 }}
    function resetTemplates() {
      templates.splice(0, templates.length); // 清空陣列
    }

  // -----------------
  // firebase 內容
  // -----------------

    // ----{{ 完整存入 : 透過 docId pinia }}
    async function saveTemplatesToFirebase() {
      const auth = getAuth();
      const user = auth.currentUser;
    
      // 確認是否有登入
      if (!user) {
        alert("Please log in to save your Story.");
        return;
      }
    
      const userId = user.uid; // 使用者 ID
      const userStoryId = `${userId}-${storyName.name}-publish`; // 故事 ID
      const filesTile = storyName.name;                        // 獲取簡報名稱
      
      // [ 打包模板資料 + 圖片存入 getStorage ]
      const storage = getStorage();

      const folderName = 'story-images';  // 設定要放置圖片的資料夾名稱
      const templatesData = await Promise.all(
        templates.map(async (template) => {
          // 如果模板資料中包含圖片 URL，進行圖片上傳
          if (template.data.imageUrl) {
            const imageRef = storageRef(storage, `images/${folderName}//${nanoid()}`);
            const imageBlob = await fetch(template.data.imageUrl).then(res => res.blob()); // 轉換成 blob
            const uploadTask = uploadBytesResumable(imageRef, imageBlob);
            // 等待圖片上傳並取得 URL
            const uploadSnapshot = await uploadTask;
            const imageUrl = await getDownloadURL(uploadSnapshot.ref);
            template.data.imageUrl = imageUrl; // 更新為 Firebase Storage 的圖片 URL
          }
          
          if (template.data.objectUrl) {
            const objectRef = storageRef(storage, `images/${folderName}/${nanoid()}`);  // 同一資料夾下
            const objectBlob = await fetch(template.data.objectUrl).then(res => res.blob());
            const uploadTask = uploadBytesResumable(objectRef, objectBlob);
            // 等待圖片上傳並取得 URL
            const uploadSnapshot = await uploadTask;
            const objectUrl = await getDownloadURL(uploadSnapshot.ref);
            template.data.objectUrl = objectUrl;
          }

          if (template.data.objectUrlB) {
            const objectRef = storageRef(storage, `images/${folderName}/${nanoid()}`);  // 同一資料夾下
            const objectBlob = await fetch(template.data.objectUrlB).then(res => res.blob());
            const uploadTask = uploadBytesResumable(objectRef, objectBlob);
            // 等待圖片上傳並取得 URL
            const uploadSnapshot = await uploadTask;
            const objectUrlB = await getDownloadURL(uploadSnapshot.ref);
            template.data.objectUrlB = objectUrlB;
          }

          // 返回每個模板的資料
          return {
            templateData: template.data // 模板具體資料
            // templateId: template.data.templateId, // 模板唯一 ID
          };
        })
      );

      // [ 把打包好的陣列存到 Firestore ]
      const db = getFirestore();
      const docIdStore = useDocIdStore(); // docId store

      // 使用 userStoryId 作為文檔 ID
      const docRef = doc(db, "books", userStoryId); // 這裡指定文檔 ID

      // 使用 setDoc() 來儲存資料
      await setDoc(docRef, {
        userId,
        userStoryId,
        templatesData, // 儲存模板資料陣列
        filesTile:filesTile,

      });

      console.log("Data saved to Firestore!");

      // 儲存 docId 到 Pinia Store
      docIdStore.setDocId(userStoryId); // 儲存指定的文檔 ID


      // =========== {{ 舊檔案存取辦法 addDoc }}

      // const docIdStore = useDocIdStore(); // docId store

      // const db = getFirestore();
      // const booksCollection = collection(db, "books");

      // const docRef = await addDoc(booksCollection, { 
      //   userId,
      //   userStoryId: userStoryId,
      //   templatesData, // 儲存模板資料陣列
      // });
      // const docId = docRef.id; // 這裡獲取 docId

      // console.log("Data saved to Firestore!");
      
      // // 儲存 docId 到 Pinia Store
      // docIdStore.setDocId(docId); // 儲存 docId
    }

    // ----{{ 存入草稿 : 透過 docId pinia }}
    async function saveDraftToFirebase() {
      const auth = getAuth();
      const user = auth.currentUser;
    
      // 確認是否有登入
      if (!user) {
        alert("Please log in to save your Story.");
        return;
      }
    
      const userId = user.uid; // 使用者 ID
      const userStoryId = `${userId}-${storyName.name}`; // 故事 ID
      const saveDate = new Date().toLocaleDateString('en-CA'); // en-CA 格式為 YYYY-MM-DD
      const filesTile = storyName.name;                        // 獲取簡報名稱

      // [ 打包模板資料 + 圖片存入 getStorage ]
      const storage = getStorage();

      const folderName = 'Draft-images';  // 設定要放置圖片的資料夾名
      const templatesData = await Promise.all(
        templates.map(async (template) => {
          // 如果模板資料中包含圖片 URL，進行圖片上傳
          if (template.data.imageUrl) {
            const imageRef = storageRef(storage, `images/${folderName}/${nanoid()}`);
            const imageBlob = await fetch(template.data.imageUrl).then(res => res.blob()); // 轉換成 blob
            const uploadTask = uploadBytesResumable(imageRef, imageBlob);
            // 等待圖片上傳並取得 URL
            const uploadSnapshot = await uploadTask;
            const imageUrl = await getDownloadURL(uploadSnapshot.ref);
            template.data.imageUrl = imageUrl; // 更新為 Firebase Storage 的圖片 URL
          }
          
          if (template.data.objectUrl) {
            const objectRef = storageRef(storage, `images/${folderName}/${nanoid()}`);  // 同一資料夾下
            const objectBlob = await fetch(template.data.objectUrl).then(res => res.blob());
            const uploadTask = uploadBytesResumable(objectRef, objectBlob);
            // 等待圖片上傳並取得 URL
            const uploadSnapshot = await uploadTask;
            const objectUrl = await getDownloadURL(uploadSnapshot.ref);
            template.data.objectUrl = objectUrl;
          }

          if (template.data.objectUrlB) {
            const objectRef = storageRef(storage, `images/${folderName}/${nanoid()}`);  // 同一資料夾下
            const objectBlob = await fetch(template.data.objectUrlB).then(res => res.blob());
            const uploadTask = uploadBytesResumable(objectRef, objectBlob);
            // 等待圖片上傳並取得 URL
            const uploadSnapshot = await uploadTask;
            const objectUrlB = await getDownloadURL(uploadSnapshot.ref);
            template.data.objectUrlB = objectUrlB;
          }

          // 返回每個模板的資料
          return {
            templateData: template.data // 模板具體資料
            // templateId: template.data.templateId, // 模板唯一 ID
          };
        })
      );

      // [ 擷取畫板畫面並上傳圖片 ]
      const boardImageUrl = await new Promise((resolve, reject) => {
      html2canvas(document.querySelector("#CreateCanvasElement"))  // 擷取整個畫板
        .then((canvas) => {
          canvas.toBlob((blob) => {
            if (blob) {
              const storage = getStorage();
              const DraftFolderName = 'Draft-covers';
              const imageRef = storageRef(storage, `images/${DraftFolderName}/${nanoid()}`);
              const uploadTask = uploadBytesResumable(imageRef, blob);
    
              uploadTask.on('state_changed',
                null,
                (error) => reject(error),
                async () => {
                  const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
                  resolve(imageUrl);  // 返回圖片 URL
                }
              );
            } else {
              reject(new Error('Failed to convert canvas to Blob'));
            }
          });
        })
        .catch(reject);
      });
      
      

      // [ 把打包好的陣列存到 Firestore ]
      const db = getFirestore();
      const docIdStore = useDocIdStore(); // docId store

      // 使用 userStoryId 作為文檔 ID
      const docRef = doc(db, "Drafts", userStoryId); // 這裡指定文檔 ID

      // 使用 setDoc() 來儲存資料
      await setDoc(docRef, {
        userId,
        userStoryId,
        saveDate,
        title: filesTile,
        templatesData,  // 儲存模板資料陣列
        boardImageUrl,  // 儲存畫板圖片 URL
      });

      console.log("Data saved to Firestore!");

      // 儲存 docId 到 Pinia Store
      docIdStore.setDocId(userStoryId); // 儲存指定的文檔 ID
    }

    // ----{{ 叫出完整 books }}
    async function loadBooksTemplatesFromFirebase(docId) {
      const db = getFirestore();
      const docRef = doc(db, "books", docId); // 根據 docId 讀取資料
      const docSnap = await getDoc(docRef);
    
      // 檢查 Firebase 中是否有該文檔
      if (docSnap.exists()) {
        console.log("Firebase 文檔資料已成功載入！");  // 加入 log 確認資料已成功載入
        const templatesData = docSnap.data().templatesData;

        
        // 清空現有模板資料
        resetTemplates();
    
        // 依次載入每個模板
        templatesData.forEach((template) => {
          const component = getTemplateComponent(template.templateData.templateName);
          console.log("處理模板:", template); // log 出當前正在處理的模板資料
          
          // 檢查是否能找到對應的模板組件
          if (component) {
            console.log(`找到模板組件: ${template.templateName}`);  // 確認找到了對應的組件
            addTemplate(component, template.templateData); // 使用已有的 addTemplate 函式
          } else {
            console.warn(`未找到模板組件: ${template.templateName}`);  // 如果沒有找到，給出警告
          }
        });
      } else {
        console.error("未找到該文檔，請確認 docId 是否正確。");  // 若文檔不存在，輸出錯誤訊息
      }
    }

    // ----{{ 叫出草稿 }}
    async function loadTemplatesFromFirebase(docId) {
      const db = getFirestore();
      const docRef = doc(db, "Drafts", docId); // 根據 docId 讀取資料
      const docSnap = await getDoc(docRef);
    
      // 檢查 Firebase 中是否有該文檔
      if (docSnap.exists()) {
        console.log("Firebase 文檔資料已成功載入！");  // 加入 log 確認資料已成功載入
        const templatesData = docSnap.data().templatesData;

        // 儲存檔案名稱到 storyName
        storyName.name = docSnap.data().title || "Untitled";  // 設置檔案名稱

        
        // 清空現有模板資料
        resetTemplates();
    
        // 依次載入每個模板
        templatesData.forEach((template) => {
          const component = getTemplateComponent(template.templateData.templateName);
          console.log("處理模板:", template); // log 出當前正在處理的模板資料
          
          // 檢查是否能找到對應的模板組件
          if (component) {
            console.log(`找到模板組件: ${template.templateName}`);  // 確認找到了對應的組件
            addTemplate(component, template.templateData); // 使用已有的 addTemplate 函式
          } else {
            console.warn(`未找到模板組件: ${template.templateName}`);  // 如果沒有找到，給出警告
          }
        });
      } else {
        console.error("未找到該文檔，請確認 docId 是否正確。");  // 若文檔不存在，輸出錯誤訊息
      }
    }


  return {
    templates,
    storyName,
    getTemplateComponent,
    setStoryName,
    addTemplate,
    removeTemplate,
    resetTemplates,
    updateTemplateData,
    saveTemplatesToFirebase,
    saveDraftToFirebase,
    loadBooksTemplatesFromFirebase,
    loadTemplatesFromFirebase,
  };
});


// ===========================
// 存入 firebase 的內容需要 :
// userId
// userStoryId: 商品的ID
// projectName: 書名資料,
// templateName:組件名稱
// templateData: template.data,
// ===========================

    // // 根據 templateName 動態加載對應的組件
    // function loadTemplateComponent(templateName) {
    //   switch (templateName) {
    //     case 'TemplateBox1':
    //       return TemplateBox1;
    //     case 'TemplateBox2':
    //       return TemplateBox2;
    //     case 'TemplateBox3':
    //       return TemplateBox3;
    //     case 'TemplateBox4':
    //       return TemplateBox4;
    //       case 'TemplateBox5':
    //         return TemplateBox5;
    //       case 'TemplateBox6':
    //         return TemplateBox6;
    //       case 'TemplateBox7':
    //         return TemplateBox7;
    //       case 'TemplateBox8':
    //         return TemplateBox8;
    //   }
    // }