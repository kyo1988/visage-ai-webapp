/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: 'hsl(var(--brand)/<alpha-value>)',
        bg: 'hsl(var(--bg)/<alpha-value>)',
        card: 'hsl(var(--card)/<alpha-value>)',
        fg: 'hsl(var(--fg)/<alpha-value>)',
        muted: 'hsl(var(--muted)/<alpha-value>)',
        'brand': {
          'beige': '#fdfbf8',
          'brown-dark': '#4a3c3c',
          'brown-light': '#6a5b5b',
          'pink-brown': '#aa8b8b',
          'pink-hover': '#c2a4a4',
          'text-main': '#333',
          'text-sub': '#555',
        }
      },
      fontFamily: {
        // Noto Sans JPを基本フォント（sans）に
        sans: ['"Noto Sans JP"', '"Lato"', 'sans-serif'],
        // Montserratをタイトル用フォント（display）に
        display: ['"Montserrat"', '"Noto Sans JP"', 'sans-serif'],
      },
      borderRadius: {
        'brand':'1rem', // 16px ≒ rounded-2xl
        '4xl': '2rem', // 32px
        '5xl': '2.5rem', // 40px
      },
      boxShadow: {
        'card': '0 15px 30px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 20px 35px rgba(0, 0, 0, 0.12)',
      }
    },
  },
  plugins: [],
}