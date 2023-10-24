// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      backgroundColor: {
        'primary': '#0d6efd', // Just as an example
        'secondary': '#6c757d',
        'success': '#198754',
        'warning': '#ffc107',
        'error': '#dc3545',
        'info': '#0dcaf0',
      },
      textColor: {
        'primary': '#0d6efd',
        'secondary': '#6c757d',
        'success': '#198754',
        'warning': '#ffc107',
        'error': '#dc3545',
        'info': '#0dcaf0',
      },
      fontSize: {
        'xs': '.75rem',     // 12px
        'sm': '.875rem',   // 14px
        'base': '1rem',    // 16px
        'lg': '1.125rem',  // 18px
        'xl': '1.25rem',   // 20px
        // ... add others as needed
      },
      fontFamily: {
        'font-1': ['PrimaryFont', 'sans'],
        'font-2': ['SecondaryFont', 'serif'],
      }
    }
  },

  variants: {},
  plugins: [],
}
