var webpack = require('webpack');
var path = require('path');
var envFile = require('node-env-file'); // load in environment variables

// process avaiable through node
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// __dirname = path to directory where node is currently running
try {
  envFile(path.join(__dirname, 'config/' + process.env.NODE_ENV + '.env'));
} catch (e) {

}

module.exports = {
  entry: [
    'script!jquery/dist/jquery.min.js', // use script-loader npm module
    'script!foundation-sites/dist/foundation.min.js', // use script-loader npm module
    './app/app.jsx'
  ], // where to pull the app code from
  externals: { // key = module name, value = variable name we want available in external script files
    jquery: 'jQuery' // allows foundation properly attach methods to jQuery object
  },
  plugins: [
    new webpack.ProvidePlugin({ // key = variable name to watch for, value = module to replace with
      '$': 'jquery',
      'jQuery': 'jquery'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false // make warnings go away when running 'NODE_ENV=production webpack -p' in terminal
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_KEY: JSON.stringify(process.env.API_KEY),
        AUTH_DOMAIN: JSON.stringify(process.env.AUTH_DOMAIN),
        DATABASE_URL: JSON.stringify(process.env.DATABASE_URL),
        STORAGE_BUCKET: JSON.stringify(process.env.STORAGE_BUCKET)
      }
    })
  ],
  output: {
    path: __dirname, // gives the path to the current folder (the root directoy)
    filename: './public/bundle.js' // where to compile the app code at
  },
  resolve: {
    root: __dirname,
    modulesDirectories: [
      'node_modules',
      './app/components', // by doing this, you don't need to list aliases
      './app/api/' // api folder for setting, retrieving data
    ],
    alias: {
      app: 'app',
      applicationStyles: 'app/styles/app.scss',
      actions: 'app/actions/actions.jsx',
      reducers: 'app/reducers/reducers.jsx',
      configureStore: 'app/store/configureStore.jsx'
    },
    extensions: ['', '.js', '.jsx'] // all the types of files to include
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, './node_modules/foundation-sites/scss') // make sassLoader aware of this directory
    ]
  },
  devtool: process.env.NODE_ENV === 'production' ? undefined : 'inline-source-map' // only use source map in production
};
