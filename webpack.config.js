
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');//dist内をクリーンナップ

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: './js/main.js'
  },
  module: {
    rules: [//各拡張子に対するルールを設定していく
      {
        test: /\.js/,
        exclude: /node_modules/,//トランスファイルの影響外に指定する
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { "targets": "> 0.25%, not dead" }],//0.25%以上のシェアがあり、公式サポートが終了していないブラウザで動作するよう
              ],
            },
          },
        ],
      },
      {
        test: /\.(css|sass|scss)/,
        use: [
          {
            //loader: 'style-loader', html内にjsが記述される方式
            loader: MiniCssExtractPlugin.loader, // cssが別ファイル(main.css)として出力されるプラグイン
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.png|\.jpg/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
        use: [
          //{
          //  loader: 'file-loader',
          //  options: {
          //    esModule: false,
          //    name: 'images/[name].[ext]',
          //  },
          //},
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