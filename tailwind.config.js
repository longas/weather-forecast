module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  theme: {
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
      mono: ["Roboto Mono", "monospace"],
    },
    extend: {
      width: {
        forecast: 700,
      },
    },
  },
  variants: {
    cursor: ["disabled"],
  },
  plugins: [],
};
