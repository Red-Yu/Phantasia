import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/tid201/g1",
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/api": {
        // 路徑在 /api 開頭，就會啟用 proxy 服務
        target: "http://localhost:3000", // proxy 的目標
        changeOrigin: true, //跨域請求時使用
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
