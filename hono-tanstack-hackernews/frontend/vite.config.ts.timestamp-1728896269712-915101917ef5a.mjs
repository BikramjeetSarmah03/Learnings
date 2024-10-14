// vite.config.ts
import path from "path";
import { TanStackRouterVite } from "file:///C:/Users/91967/Desktop/Learnings/hono-tanstack-hackernews/frontend/node_modules/@tanstack/router-plugin/dist/esm/vite.js";
import react from "file:///C:/Users/91967/Desktop/Learnings/hono-tanstack-hackernews/frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///C:/Users/91967/Desktop/Learnings/hono-tanstack-hackernews/frontend/node_modules/vite/dist/node/index.js";
var __vite_injected_original_dirname = "C:\\Users\\91967\\Desktop\\Learnings\\hono-tanstack-hackernews\\frontend";
var vite_config_default = defineConfig({
  plugins: [
    TanStackRouterVite({
      routesDirectory: "src/pages"
    }),
    react()
  ],
  resolve: {
    alias: {
      "@/shared": path.resolve(__vite_injected_original_dirname, "../shared"),
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  server: {
    proxy: {
      "/api/v1": {
        target: "http://localhost:3000",
        changeOrigin: true
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFw5MTk2N1xcXFxEZXNrdG9wXFxcXExlYXJuaW5nc1xcXFxob25vLXRhbnN0YWNrLWhhY2tlcm5ld3NcXFxcZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXDkxOTY3XFxcXERlc2t0b3BcXFxcTGVhcm5pbmdzXFxcXGhvbm8tdGFuc3RhY2staGFja2VybmV3c1xcXFxmcm9udGVuZFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvOTE5NjcvRGVza3RvcC9MZWFybmluZ3MvaG9uby10YW5zdGFjay1oYWNrZXJuZXdzL2Zyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IFRhblN0YWNrUm91dGVyVml0ZSB9IGZyb20gXCJAdGFuc3RhY2svcm91dGVyLXBsdWdpbi92aXRlXCI7XG5cbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgVGFuU3RhY2tSb3V0ZXJWaXRlKHtcbiAgICAgIHJvdXRlc0RpcmVjdG9yeTogXCJzcmMvcGFnZXNcIixcbiAgICB9KSxcbiAgICByZWFjdCgpLFxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQC9zaGFyZWRcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuLi9zaGFyZWRcIiksXG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcbiAgICB9LFxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBwcm94eToge1xuICAgICAgXCIvYXBpL3YxXCI6IHtcbiAgICAgICAgdGFyZ2V0OiBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMFwiLFxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBc1ksT0FBTyxVQUFVO0FBQ3ZaLFNBQVMsMEJBQTBCO0FBRW5DLE9BQU8sV0FBVztBQUNsQixTQUFTLG9CQUFvQjtBQUo3QixJQUFNLG1DQUFtQztBQU96QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxtQkFBbUI7QUFBQSxNQUNqQixpQkFBaUI7QUFBQSxJQUNuQixDQUFDO0FBQUEsSUFDRCxNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsWUFBWSxLQUFLLFFBQVEsa0NBQVcsV0FBVztBQUFBLE1BQy9DLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMLFdBQVc7QUFBQSxRQUNULFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxNQUNoQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
