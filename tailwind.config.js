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
        // メインカラー：サーモンピンク
        primary: {
          DEFAULT: '#FF9B9B',
          light: '#FFB4B4',
          dark: '#FF8080',
        },
        // サブカラー1：ライトグレージュ
        secondary: {
          DEFAULT: '#F5F2EF',
          light: '#F9F7F5',
          dark: '#E8E3DE',
        },
        // サブカラー2：スモーキーネイビー
        tertiary: {
          DEFAULT: '#3D4F75',
          light: '#5A6B8A',
          dark: '#2A3A5F',
        },
        // アクセントカラー：サンセットイエロー
        accent: {
          DEFAULT: '#F4B95F',
          light: '#F7C878',
          dark: '#E6A546',
        },
        // グレースケール
        gray: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#EEEEEE',
          300: '#E0E0E0',
          400: '#BDBDBD',
          500: '#9E9E9E',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
        }
      },
      fontFamily: {
        sans: ['Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'Yu Gothic Medium', 'Meiryo', 'sans-serif'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '20px',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'medium': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'strong': '0 8px 24px rgba(0, 0, 0, 0.16)',
      }
    },
  },
  plugins: [],
} 