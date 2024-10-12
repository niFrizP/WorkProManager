/** @type {import('tailwindcss').Config} */
module.exports = {
<<<<<<< HEAD
  // ... other configurations
  plugins: [
    require('tailwindcss-filters'),
    // ... other plugins
  ],
}
=======
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
>>>>>>> c59ed2432fa62960f41854a4b1d314023022219c
