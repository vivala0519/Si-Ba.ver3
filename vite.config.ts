import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'custom-rewrite',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (/^\/[^.]*$/.test(req.url)) {
            req.url = '/';
          }
          next();
        });
      },
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  }
})
