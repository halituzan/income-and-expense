import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/configs/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        incomes: "#059669",
        expenses: "#f87171",
        primary: "#475569",
        white: "#fff",
        warning: "#f59e0b",
      },
      keyframes: {
        "fade-in-up": {
          "0%": {
            transform: "translateY(100%)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
        "menu-fade-up": {
          "0%": {
            transform: "translateY(0)",
          },
          "10%": {
            transform: "translateY(0)",
          },
        },
        "logo-animate": {
          "0%": {
            width: "0px",
          },
          // "25%": {
          //   width: "10px",
          // },
          // "50%": {
          //   width: "20px",
          // },
          // "75%": {
          //   width: "30px",
          // },
          "100%": {
            width: "auto",
          },
        },
      },
      animation: {
        fadeInUp: "fade-in-up 0.2s",
        menuFadeUp: "menu-fade-up 0.1s",
        logoAnimate: "logo-animate 0.2s",
      },
      transitionTimingFunction: {
        "in": "cubic-bezier(0,_-1,_0.07,_-1)",
      },
    },
  },
  plugins: [],
};
export default config;
