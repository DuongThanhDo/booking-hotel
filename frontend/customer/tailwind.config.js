/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: 'rgb(16, 24, 40)',
            },
            scrollSnapType: {
                y: 'scroll-snap-type: y mandatory;',
            },
        },
    },
    plugins: [],
};
