import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' 

export default defineConfig(({ mode }) => {
  // .env ஃபைலில் உள்ள வேரியபிள்களை லோட் செய்கிறோம்
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      tailwindcss(), 
    ],
    server: {
      proxy: {
        '/api': {
          // ஆன்லைனில் இருந்தால் Render URL-ஐயும், இல்லையென்றால் localhost-ஐயும் எடுக்கும்
          target: env.VITE_API_URL || 'http://localhost:5000',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }
})