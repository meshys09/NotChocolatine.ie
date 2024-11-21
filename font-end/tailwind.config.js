/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,tsx,ts,js}"],
  theme: {
      extend: {
        colors: {
          'orange': '#fccc49',
          'light-orange': '#fceec7',
          'dark-orange': '#c18f03',
          'mid-orange': '#d19a04',
        },
        fontFamily: {
          sans: ['Graphik', 'sans-serif'],
          serif: ['Merriweather', 'serif'],
        },
        spacing: {
          '8xl': '96rem',
          '9xl': '128rem',
        },
        borderRadius: {
          '4xl': '2rem',
        }
      }
  },
  plugins: [],
}

