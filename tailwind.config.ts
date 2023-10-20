import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        paytone: ["Paytone One", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
