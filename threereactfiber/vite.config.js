import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {'process.env': {

    REACT_APP_API_KEY : "",
    REACT_APP_API_URL : "http://localhost:9999/" 

  }},
})
