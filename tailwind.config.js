/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: { 950: '#06172d', 900: '#09213f', 800: '#10345e', 700: '#164c7c' },
        ink: '#11233c',
        emerald: { 50: '#effcf6', 100: '#d8f7e8', 500: '#1fa774', 600: '#15845b' },
        mist: '#f5f8fc'
      },
      boxShadow: {
        card: '0 10px 30px rgba(12, 39, 72, 0.06)',
        lift: '0 16px 38px rgba(12, 39, 72, 0.12)'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}
