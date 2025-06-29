/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            screens: { 'sm': { 'max': '640px' } },
        },
    },
    plugins: [],
    important: true,
}