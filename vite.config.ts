
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/Developer-Portfolio/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react({
      // Configure SWC with compatible options
      swcOptions: {
        jsc: {
          transform: {
            react: {
              runtime: "automatic",
              development: mode === 'development',
              refresh: mode === 'development'
            }
          }
        }
      }
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "three": path.resolve(__dirname, "./node_modules/three"),
      "@react-three/fiber": path.resolve(__dirname, "./node_modules/@react-three/fiber"),
      "@react-three/drei": path.resolve(__dirname, "./node_modules/@react-three/drei"),
    },
    dedupe: ['react', 'react-dom', 'three'],
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: mode === 'development',
    chunkSizeWarningLimit: 1600,
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@radix-ui/react-avatar', '@radix-ui/react-toast', '@radix-ui/react-tooltip'],
          three: ['three'],
          fiber: ['@react-three/fiber'],
          drei: ['@react-three/drei'],
          motion: ['framer-motion'],
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
    exclude: [] 
  }
}));
