const webpack = require('webpack')

module.exports = {
  entry: './react/index.js',
  mode: "development",
  output:{
    filename: 'bundle.js',
    path: __dirname
  },
  module: {
    rules: [
      {
        test: /(.js|.jsx)$/,
        exclude: '/node_modules/',
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@emotion/babel-preset-css-prop'
            ]
          }
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader","css-loader"]
      }
    ]
  },
  resolve: {
    extensions: ['.jsx','.js','.css']
  },
  plugins: [
    new webpack.ExternalsPlugin('commonjs',['electron'])
  ]
}
