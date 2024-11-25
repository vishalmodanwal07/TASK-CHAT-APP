/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Includes all JS, JSX, TS, and TSX files in the src folder
    "./public/index.html",        // If using Tailwind classes in HTML files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

