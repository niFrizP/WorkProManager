/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    backdropFilter: {
      'none': 'none',
      'blur': 'blur(20px)',
      extend: {},
    },
    plugins: [
      require('tailwindcss-filters'),
    ],
  }
}
