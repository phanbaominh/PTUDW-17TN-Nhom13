const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./server/**/*.html"],
  defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
  whitelist: ["html", "body", "book__detail-tab--highlight"]
});

module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    ...(process.env.NODE_ENV === "production" ? [purgecss] : [])
  ]
};
