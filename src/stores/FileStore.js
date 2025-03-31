// stores/fileStore.js
import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useFileStore = defineStore('fileStore', () => {
  const selectedFile = reactive({
    id: null,
    name: '',
    size: 0,
    type: '',
    time: '',
    url: ''
  });

  function setSelectedFile(file) {
    selectedFile.id = file.id ;
    selectedFile.name = file.name;
    selectedFile.size = file.size;
    selectedFile.type = file.type;
    selectedFile.time = file.time;
    selectedFile.url = file.url;
    
    console.log("Selected file:", selectedFile); // 確認檔案資料是否正確儲存
  }

  function resetSelectedFile() {
    selectedFile.id = null;
    selectedFile.name = '';
    selectedFile.size = 0;
    selectedFile.type = '';
    selectedFile.time = '';
    selectedFile.url = '';
  }

  return {
    selectedFile,
    setSelectedFile,
    resetSelectedFile
  };
});
