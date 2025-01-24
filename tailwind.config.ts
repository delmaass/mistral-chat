import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      onbase: {
        primary: "#000000",
      },
      surface: {
        primary: "#FFFFFF",
      },
      brand: {
        orange: "#FF7000",
      },
    },
    borderRadius: {
      sm: "0.5rem", // 8px
      DEFAULT: "1rem", // 16px
      lg: "2rem", // 32px
      full: "999px",
    },
    fontSize: {
      sm: ["0.75rem", { lineHeight: "0.875rem" }], // FS 12px / LH 14px
      DEFAULT: ["1rem", { lineHeight: "1.125rem" }], // FS 16px / LH 18px
      lg: ["1.25rem", { lineHeight: "1.375rem" }], // FS 20px / LH 22px
    },
    fontWeight: {
      DEFAULT: "400",
      medium: "500",
      semibold: "600",
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
