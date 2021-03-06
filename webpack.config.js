var path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: ['./src/CitrusAd.ts'],
  output: {
    filename: 'citrus.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd'
  },
  module: {
    rules: [{
        test: /\.tsx?$/,
        use: ['ts-loader', 'source-map-loader'],
        exclude: /node_modules/
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  plugins: [
    new UglifyJSPlugin({
      compress: {
        unused: true,
        dead_code: true
      },
    })
  ]
}