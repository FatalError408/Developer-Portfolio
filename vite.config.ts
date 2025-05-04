
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/Developer-Portfolio/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react({
      // Configure React with SWC for better performance
      plugins: [
        ["@swc/plugin-react-remove-properties", { properties: ["^data-testid$"] }]
      ]
    }),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Ensure consistent versions for Three.js packages
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
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: true,
        pure_funcs: mode === 'production' ? ['console.log', 'console.info', 'console.debug'] : [],
      },
    },
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
    exclude: [] // Remove @react-three/fiber from exclusions to resolve dependencies properly
  },
  // Add esbuild options for better JS optimization
  esbuild: {
    jsxInject: "import React from 'react'",
    legalComments: 'none',
    treeShaking: true,
    minifyIdentifiers: true,
    minifySyntax: true,
  }
}));
