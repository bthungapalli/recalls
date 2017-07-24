module.exports = {

  entry: './src/client/app/bootstrap',
  output: {
    path: __dirname,
    filename: './dist/app.bundle.js'
  },
  module: {
    loaders: [
      {test: /\.ts$/, loaders: ['ts-loader'] , exclude:/node_modules/}
    ]
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
 

};
