/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,js,html}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#D83A56",  // Colore di base, rosa corallo
          contrast: "#FFFFFF", // Colore per il testo su primary, bianco
          hover: "#E46C74",    // Colore al passaggio del mouse, un rosa più chiaro
        },
        secondary: {
          DEFAULT: "#4F9D8F",  // Verde menta
          contrast: "#FFFFFF", // Bianco per il testo su secondary
          hover: "#6AB79F",    // Verde un po' più chiaro per hover
        },
        tertiary: {
          DEFAULT: "#F0A500",  // Giallo aranciato
          contrast: "#1C1C1C", // Testo scuro per il contrasto
          hover: "#F5B800",    // Un po' più dorato per hover
        },
        backgroundPrimary: "#F6F6F6",  // Grigio chiaro per sfondo
        accent: {
          DEFAULT: "#8A2BE2",  // Viola brillante
          contrast: "#FFFFFF", // Testo bianco su viola
          hover: "#9B4DCA",    // Hover un po' più scuro
        },
        success: {
          DEFAULT: "#2D9C61",  // Verde successo
          contrast: "#FFFFFF", // Bianco per il testo su success
          hover: "#34D399",    // Verde più chiaro per hover
        },
        warning: {
          DEFAULT: "#F59E0B",  // Giallo oro intenso
          contrast: "#1C1C1C", // Testo scuro su warning
          hover: "#F8A200",    // Giallo più scuro per hover
        },
        error: {
          DEFAULT: "#F56565",  // Rosso corallo per errori
          contrast: "#FFFFFF", // Bianco per il testo su errore
          hover: "#F75C5C",    // Hover un po' più scuro
        },
        textPrimary: "#1C1C1C",  // Nero profondo per il testo principale
        textSecondary: "#6B7280", // Grigio scuro per testo secondario
      },
    },
  },
  plugins: [],
}
