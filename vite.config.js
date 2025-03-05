import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //base: '/DayOnEarth/' //this for my site. http://mmalabugin.ru/DayOnEarth/
})
