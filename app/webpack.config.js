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
              '@babel/preset-env','@babel/preset-react'
            ]
          }
        },
      },
    ]
  },
  resolve: {
    extensions: ['.jsx','.js']
  }
}
