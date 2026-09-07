import { defineConfig } from 'vite';
import fs from 'fs';

export default defineConfig({
  plugins: [
    {
      name: 'hono-ssr-dist',
      buildStart() {
        fs.mkdirSync('dist', { recursive: true });
        fs.writeFileSync('dist/.gitkeep', '');
      }
    }
  ],
  build: {
    emptyOutDir: false,
    outDir: 'dist',
    rollupOptions: {
      input: 'src/types.ts'
    }
  }
});
