/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // カラーガイドライン
        'salmon-coral': '#FF6F61',      // メインカラー
        'light-greige': '#F5F2EF',      // サブカラー1
        'smoky-navy': '#3D4F75',        // サブカラー2
        'sunset-yellow': '#F4B95F',     // アクセントカラー
      },
      fontFamily: {
        sans: ['Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Noto Sans JP', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 