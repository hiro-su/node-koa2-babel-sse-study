import 'babel-polyfill';
import path from 'path';
import moment from 'moment';
import webpack from 'webpack';
import AssetsPlugin from 'assets-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const assetsPluginInstance = new AssetsPlugin();

export default [
  {
    entry: path.join(__dirname, 'app/assets/javascripts/application.js'),
    output: {
      path: path.join(__dirname, 'public', 'assets'),
      filename: `application-${moment().format('YYYYMMDD')}_[hash].js`
    },
    resolve: {
      extensions: ['', '.js']
    },
    module: {
      loaders: [
        { test: /\.js$/, include: [path.resolve(__dirname, 'app', 'assets', 'javascripts')], loaders: ['babel']},
      ]
    },
    plugins: (process.env.NODE_ENV === 'production') ? [
      defineConstants(),
      optimizeMinimize(),
      assetsPluginInstance
    ] : [
      defineConstants(),
      assetsPluginInstance
    ]
  },
  {
    entry: path.join(__dirname, 'app/assets/stylesheets/application.scss'),
    output: {
      path: path.join(__dirname, 'public', 'assets'),
      filename: `application-${moment().format('YYYYMMDD')}_[hash].css`
    },
    module: {
      loaders: [
        { test: /\.scss$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader") }
      ]
    },
    plugins: [
      optimizeMinimize(),
      assetsPluginInstance,
      extractText('css')
    ]
  }
]

function optimizeMinimize() {
  return new webpack.optimize.UglifyJsPlugin({
    compress: {
      drop_console: true,
      warnings: false
    }
  });
}

function defineConstants() {
  return new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  });
}

function extractText(ext) {
  return new ExtractTextPlugin(
    `application-${moment().format('YYYYMMDD')}_[hash].${ext}`
  );
}
