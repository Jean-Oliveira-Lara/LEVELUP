import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Em desenvolvimento, as rotas /api são servidas pelo `vercel dev`.
// Se rodar só `npm run dev`, aponte o proxy para um `vercel dev` na porta 3000.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})
