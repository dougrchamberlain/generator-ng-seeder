const proxies = {
  'iis': 'http://localhost',
  'json': 'http://localhost:3000'
}

const webpack = require('webpack');
const path = require('path');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'ngtemplate?relativeTo=' + path.join(path.resolve(__dirname), '/app/!html')
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
        loader: 'url-loader?limit=100000'
      },
      {test: /\.(styl)$/, loader: 'css-loader!style-loader!stylus-loader'},
      {
        test: /\.(css|scss)$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['es2015'],
          cacheDirectory: true
        }
      }
    ]
  },
  context: __dirname,
  entry: {
    'app': ["webpack-dev-server/client?http://localhost:8080",
      "webpack/hot/dev-server", "./app/index.js"]
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/dist/",
    filename: "[name].bundle.js"
  },
  devtool: "source-map",
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({compress:{warnings:false}}),
    //new ngAnnotatePlugin({
    //    add: true
    //}),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    proxy: {
      '/iDentifi.Net/SpaApi/**/*': {
        target: proxies[process.env.target || 'iis'],
        changeOrigin: true,
        logLevel: 'debug'
      },
      '/api/**/*': {
        target: proxies[process.env.target || 'iis'],
        changeOrigin: true,
        logLevel: 'debug'
      }

    },
    hot: true, inline: true,
    contentBase: "./",
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1500
    },
  }
}
