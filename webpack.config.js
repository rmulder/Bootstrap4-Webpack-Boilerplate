const path = require("path"); //node module that provides methods for path.
const HtmlWebpackPlugin = require("html-webpack-plugin");
const autoprefixer = require("autoprefixer");
var webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [
                require("autoprefixer")({ browsers: ["last 3 versions"] })
              ]
            }
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: "file-loader?name=/assets/fonts/[name].[ext]"
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          "file-loader?name=/assets/images/[name].min.[ext]",
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html"
    }),

    new webpack.ProvidePlugin({
      $: "jquery",
      jquery: "jquery",
      Util: "exports-loader?Util!bootstrap/js/dist/util"
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, "public")
  }
};
