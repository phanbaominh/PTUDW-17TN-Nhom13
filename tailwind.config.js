module.exports = {
  theme: {
    screens: {
      "4xl": { max: "1919px" },
      "3xl": { max: "1659px" },
      "2xl": { max: "1439px" },
      xl: { max: "1279px" },
      lg: { max: "1023px" },
      md: { max: "767px" },
      sm: { max: "639px" }
    },
    extend: {
      fontFamily: {
        arimo: ["Arimo", "sans-serif"],
        lato: ["Lato", "sans-serif"]
      },
      fontSize: {
        "14": "1.4rem",
        "16": "1.6rem",
        "18": "1.8rem",
        "20": "2rem",
        "24": "2.4rem",
        "28": "2.8rem",
        "32": "3.2rem",
        "36": "3.6rem"
      },
      lineHeight: {
        "18": "1.8rem",
        "20": "2rem",
        "24": "2.4rem",
        "28": "2.8rem",
        "32": "3.2rem",
        "38": "3.8rem"
      },
      spacing: {
        "p-38": "3.8rem",
        "p-44": "4.4rem",
        "p-54": "5.4rem",
        "p-60": "6rem",
        "p-70": "7rem",
        "p-80": "8rem",
        "p-85": "8.5rem"
      },
      colors: {
        "fit-yellow": "#F0C14B",
        "fit-yellow-light": "#f5c753",
        "fit-blue": "#131A22",
        "fit-orange": "#F08804",
        "fit-grey": "#c4c4c4"
      },
      borderRadius: {
        "5": "0.5rem",
        "6": "0.6rem",
        "10": "1rem"
      }
    }
  },
  purge: false
};
