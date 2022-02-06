
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');//dist内をクリーンナップ

module.exports = {
  mode: 'development',
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: './js/main.js'
  },
  module: {
    rules: [//各拡張子に対するルールを設定していく
      {
        test: /\.css/,
        use: [
          {
            //loader: 'style-loader', html内にjsが記述される方式
            loader: MiniCssExtractPlugin.loader, // cssが別ファイル(main.css)として出力されるプラグイン
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.png|\.jpg/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name: 'images/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename:'./css/main.css',
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/index.html',//テンプレートとして上記のjsやcssが自動的に読み込まれる
    }),
    new CleanWebpackPlugin(),
  ],
};