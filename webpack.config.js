const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: {
    // _webgl: './src/webgl/_webgl.js',
    app: [
      './src/app.js',
      "./src/scss/app.scss",
    ]
  },
  devtool: 'inline-source-map',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './public'),
  },
  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
              loader: 'css-loader', 
              options: {
                  sourceMap: true, 
                  url: false
              }
          },
          {
              loader: 'sass-loader',
              options: {
                  sourceMap: true,
              }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: (pathData) => {
          let res;
          res = './assets/webgl/css/[name].css';
          return res;
      },
      chunkFilename: '[id].css',
      ignoreOrder: false,
    }),
  ],
  performance : {
    hints : false
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 1116,
    // hot: true,
    server: 'http',
  },
}
