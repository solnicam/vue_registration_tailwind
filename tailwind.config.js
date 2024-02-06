module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      borderWidth: {
        '0.5': '0.5px',
      },
      colors: {
        'violet1': '#8302ef',
        'dark-blue': '#1343ef',
        'gray1': '#f7f8fa',
        'gray2': '#75879e',
      },
      boxShadow: {
        'outline-indigo': '0px -10px 0px 0px #4f46e5',
      }
    }
  },
  plugins: [],
}