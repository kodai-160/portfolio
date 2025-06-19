import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          background: "var(--card-background)",
          border: "var(--card-border)",
        }
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'var(--foreground)',
            a: {
              color: 'var(--tw-prose-links)',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            code: {
              color: 'var(--tw-prose-code)',
              backgroundColor: 'var(--tw-prose-code-bg)',
              borderRadius: '0.25rem',
              paddingLeft: '0.25rem',
              paddingRight: '0.25rem',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  darkMode: "media",
} satisfies Config;