
import { defineConfig } from "vite"
import uni from "@dcloudio/vite-plugin-uni"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  server: {
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: path => path.replace(new RegExp('^' + process.env.VUE_APP_BASE_API), '')
      },
    }
  }

})
