/** @type {import('tailwindcss').Config} */
export const darkMode = ["selector"];
export const content = [
  './pages/**/*.{ts,tsx}',
  './components/**/*.{ts,tsx}',
  './app/**/*.{ts,tsx}',
  './src/**/*.{ts,tsx}',
];
export const prefix = "";
export const theme = {

  screens: {
    'sm': '640px',
    'md': '768px',
    'lg': '1024px',
    'xl': '1280px',
    '2xl': '1536px',
  },
  container: {
    center: true,
    screens: {
      "2xl": "1400px",
    },
  },
  extend: {

    colors: {
      "light": "#fffdff",
      "lightgrey": "#f8f8f8",
      "hovergrey": "#e7e7e7",
      "dark": "#0d0d0d",
      "grey": {
        "100": "#f5f5f5",
        "200": "#e7e7e7",
        "300": "#d9d9d9",
        "400": "#bfbfbf",
        "500": "#a6a6a6",
        "600": "#8c8c8c",
        "700": "#737373",
        "800": "#595959",
        "900": "#404040",
      },
      "red": "#ff4d4d",
      ascent: {
        "100": "#49a010",
        "200": "#397d0d"
      }
    },
    keyframes: {
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
    },
    fontFamily: {

      pops: ["poppins", "sans-serif"],
      monts: ["montserrat", "sans-serif"],
    }

  },
};
// eslint-disable-next-line no-undef
export const plugins = [require("tailwindcss-animate")];