module.exports = {
  entry: ["./app/main.js"], // assumes your entry point is the ./app/main.js in the root of your project folder
  mode: "development",
  output: {
    path: __dirname, // assumes your bundle.js will also be in the root of your project folder
    filename: "./public/bundle.js",
  },
  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          presets: ["react", "es2015"],
        },
      },
      // use the style-loader/css-loader combos for     anything matching the .css extension
      //"@babel/preset-env", "@babel/preset-react"
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
