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
        "./List": "./src/components/List.jsx",
        "./Input": "./src/components/Input.jsx",
      },
      shared: ["react"],
    }),
  ],
  build: {
    base: "/", // 確保基底路徑正確，避免重複 /assets
    assetsDir: "", // 清空資源目錄前綴，避免生成 assets/assets
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 5172, // 開發環境的端口，例如設為 5172 (預設)
  },
  preview: {
    port: 4173, // 預覽環境的端口，例如設為 4173 (預設)
  },
});