module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.{js,jsx,ts,tsx}", // Include Flowbite
    "./node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx,vue}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require("flowbite/plugin"), // Flowbite plugin
    require("daisyui"), // DaisyUI plugin (if used)
  ],
  daisyui: {
    themes: ["light"],
  },
};