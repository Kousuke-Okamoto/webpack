
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');//dist内をクリーンナップ
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/js/main.js',
  output: {
    path: path.join(__dirname, './dist/'),
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
      //{
      //  test: /\.png|\.jpg|\.jpeg/,
      //  type: 'asset/resource',
      //  generator: {
      //    filename: 'images/[name][ext]',
      //  },
      //  use: [
      //    //{
      //    //  loader: 'file-loader',
      //    //  options: {
      //    //    esModule: false,
      //    //    name: 'images/[name].[ext]',
      //    //  },
      //    //},
      //    {
      //      loader: 'image-webpack-loader',
      //    }
      //  ],
      //},
      {
        test: /\.vue/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'vue-loader',
          }
        ],
      },
    ],
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: `${__dirname}/src/images/`,
          to: `${__dirname}/dist/images/`,
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename:'./css/[name].css',
    }),
    new HtmlWebpackPlugin(),
    new HtmlWebpackPlugin({  // Also generate a test.html
      filename: 'test/index.html',
      template: 'src/test/index.ejs'
    }),
    new CleanWebpackPlugin(),
  ],
};