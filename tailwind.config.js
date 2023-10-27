/** @type {import('tailwindcss').Config} */
export default {
  // corePlugins: {
  //   preflight: false,
  // },
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")], // eslint-disable-line no-undef
};
