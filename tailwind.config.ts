import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./node_modules/flowbite-react/lib/**/*.js",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        secondary: "#121e27",
        primary: "#13C2B5",
      },
      minHeight: {
        "screen-1/3": "33vh",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
export default config;
