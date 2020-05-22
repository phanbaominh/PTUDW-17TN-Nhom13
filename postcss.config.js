const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./client/**/*.ts", "./client/**/*.tsx"],
  defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
  whitelist: ["html", "body"]
});

module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    ...(process.env.NODE_ENV === "production" ? [purgecss] : [])
  ]
};
