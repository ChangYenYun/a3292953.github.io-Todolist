// vite.config.js in todo-components
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "todo-components",
      filename: "remoteEntry.js",
      exposes: {
        "./TodoInput": "./src/components/TodoInput.jsx",
        "./TodoItem": "./src/components/TodoItem.jsx",
        "./TodoList": "./src/components/TodoList.jsx",
        "./todoService": "./src/services/todoService.js",
      },
      shared: ["react"],
    }),
  ],
  build: {
    base: "/todo-components/", // 確base: "/todo-components/", // 改為您的 GitHub 專案名稱保基底路徑正確，避免重複 /assets
    assetsDir: "", // 清空資源目錄前綴，避免生成 assets/assets
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 5173, // 開發環境的端口，例如設為 5173 (預設)
  },
  preview: {
    port: 4173, // 預覽環境的端口，例如設為 4173 (預設)
  },
});
