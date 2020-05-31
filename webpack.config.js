const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = function (env) {
  var isProduction = env === "production";
  return {
    plugins: [
      new MiniCssExtractPlugin({
        filename: path.join("stylesheets", "[name].css")
      })
    ],
    mode: isProduction ? "production" : "development",
    devtool: "source-map",
    resolve: {
      extensions: [".js", ".ts", ".tsx"]
    },
    optimization: isProduction
      ? { minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})] }
      : {},
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: [{ loader: "ts-loader" }, { loader: "eslint-loader" }]
        },
        {
          enforce: "pre",
          test: /\.js$/,
          loader: "source-map-loader"
        },
        {
          test: /\.s?css$/,
          exclude: /tailwind.css/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            { loader: "css-loader", options: { sourceMap: true } },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true,
                config: {
                  path: "postcss.config.js"
                }
              }
            },
            { loader: "sass-loader", options: { sourceMap: true } }
          ]
        },
        {
          test: /tailwind.css/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            { loader: "css-loader", options: { sourceMap: true } },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true,
                config: {
                  path: "postcss.config.js"
                }
              }
            }
          ]
        }
      ]
    },

    entry: {
      index: path.join(__dirname, "client", "index.ts"),
      style: path.join(__dirname, "client", "styles", "all.scss"),
      tailwind: path.join(__dirname, "client", "styles", "tailwind.css")
    },
    output: {
      filename: path.join("javascripts", "[name].js"),
      path: path.join(__dirname, "public"),
      publicPath: "/"
    }
  };
};
