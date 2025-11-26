/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'exza-purple': '#7a6af6',   
                'exza-dark': '#333333',      
                'exza-light': '#f0f8ff',      
                'bg-start': '#b3a0e6',     
                'bg-end': '#a0c2e6',    
            },

            backgroundImage: {
                'exza-gradient': 'linear-gradient(135deg, #b3a0e6 0%, #a0c2e6 100%)',
            },

            backdropBlur: {
                soft: "8px",
                hard: "15px",
            },

            boxShadow: {
                card: "0 4px 6px rgba(0,0,0,0.1)",
                category: "0 2px 4px rgba(0,0,0,0.05)",
                elevated: "0 10px 20px rgba(0,0,0,0.15)",
            },
        },
    },
    plugins: [],
}
