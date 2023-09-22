/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './pages/**/*.{html,js}',
    './components/**/*.{html,js}',
],
  theme: [],
  daisyui: {
    themes: [
      {
        mytheme: {
        
          "primary": "#011123",
                  
          "secondary": "#0c0123",
                  
          "accent": "#dfa5ff",
                  
          "neutral": "#0f0c00",
                  
          "base-100": "#0f0c00",
                  
          "info": "#3ABFF8",
                  
          "success": "#36D399",
                  
          "warning": "#FBBD23",
                  
          "error": "#F87272",
        },
      },
    ],
  },
  plugins: [
    require('daisyui')
  ],
}
