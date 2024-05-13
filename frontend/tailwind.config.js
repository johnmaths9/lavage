/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./node_modules/tw-elements/js/**/*.js",
      'node_modules/flowbite-react/lib/esm/**/*.js'
    ],
    theme: {
        extend: {},
    },
    plugins: [require("tw-elements/plugin.cjs"), require('flowbite/plugin')
    ],
}

