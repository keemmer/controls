/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // "./pages/**/*.{js,ts,jsx,tsx}",
    // "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7254d4",
        sidebarBg: "#ffffff",
        sidebarText: "#6b7280", // Tailwind gray-500
        sidebarHover: "#f3f4f6", // Tailwind gray-100
		
      },
    },
  },
  plugins: [],
};
