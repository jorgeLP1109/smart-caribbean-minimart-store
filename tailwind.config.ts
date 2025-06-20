// archivo: tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Aquí defines tu paleta de colores personalizada
      colors: {
        'brand-orange': '#f28c38',
        'brand-dark': '#000000',
        'brand-light': '#ffffff',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    // Podríamos añadir plugins de formularios aquí en el futuro para mejorar los estilos
    // require('@tailwindcss/forms'),
  ],
};
export default config;