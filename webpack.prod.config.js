const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  entry: {
    // _webgl: './src/webgl/_webgl.js',
    app: [
      './src/app.js',
      "./src/scss/app.scss",
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './public/assets/webgl'),
  },
  performance : {
    hints : false
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
          res = '/css/[name].css';
          return res;
      },
      chunkFilename: '[id].css',
      ignoreOrder: false,
    }),
  ],
}
