/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Kamu bisa menambahkan warna hijau khas FoodSave di sini jika mau
        foodsave: '#10b981', 
      }
    },
  },
  plugins: [],
}