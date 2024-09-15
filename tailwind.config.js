module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        'rojo': 'rgb(255, 65, 54)',
        'verde': 'rgb(46, 204, 64)',
        'azul': 'rgb(0, 116, 217)',
        'amarillo': 'rgb(253 224 71)',
      },
      fontFamily: {
        'bungee': ['"Bungee"', 'sans-serif'],
      },
      borderRadius: {
        'custom-rounded-tl-full': '320px 20px 20px',
        'custom-rounded-tr-full': '20px 320px 20px 20px',
        'custom-rounded-bl-full': '20px 20px 20px 320px',
        'custom-rounded-br-full': '20px 20px 320px',
      },
    },
  },
  plugins: [],
}

