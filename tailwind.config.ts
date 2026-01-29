import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            screens: {
                'xs': '375px',      // Small phones
                'sm': '640px',      // Large phones
                'md': '768px',      // Tablets portrait
                'lg': '1024px',     // Tablets landscape, small laptops
                'xl': '1280px',     // Laptops
                '2xl': '1536px',    // Desktops
                '3xl': '1920px',    // Large desktops (Full HD+)
            },
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            // Add safe area for notched devices
            spacing: {
                'safe-top': 'env(safe-area-inset-top)',
                'safe-bottom': 'env(safe-area-inset-bottom)',
                'safe-left': 'env(safe-area-inset-left)',
                'safe-right': 'env(safe-area-inset-right)',
            },
        },
    },
    plugins: [],
};

export default config;
