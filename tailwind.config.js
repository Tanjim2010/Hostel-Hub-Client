/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
      theme: {
        extend: {
          colors: {
            'primary-color': '#FF5733',
            'secondary-color': '#FFC300',
            'background-color': '#F8F9FA',
            'accent-color': '#28A745',
            'text-color': '#343A40',
            'error-color': '#DC3545',
            'success-color': '#28A745',
          },
        },
      },
  plugins: [
    daisyui,
  ],
}

