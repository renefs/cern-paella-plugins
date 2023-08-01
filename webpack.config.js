const path = require('path');
const config = require('./webpack.common');

config.entry = './src/index.js',
config.output = {
    path: path.join(__dirname, "dist"),
    filename: 'cern-paella-plugins.js',
    library: 'cern-paella-plugins',
    libraryTarget: 'umd'
};
config.externals = {
    "paella-core": {
        commonjs: 'paella-core',
        commonjs2: 'paella-core',
        amd: 'paella-core'
    }
};

module.exports = config;
