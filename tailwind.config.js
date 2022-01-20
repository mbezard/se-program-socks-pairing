module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primary: "#00467f",
                "greyLight-1": "#e4ebf5",
                "greyLight-2": "#c8d0e7"
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
