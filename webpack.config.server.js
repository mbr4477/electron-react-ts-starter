const path = require('path');
const base = require('./webpack.config.base');
const webpack = require('webpack');

// use an array so webpack will pack both configurations
module.exports = [
    // add to the main process config
    Object.assign({}, base.main, {
        mode: 'development', // set to development mode
        // define the config for webpack-dev-server
        devServer: {
            // point at content in the render directory since
            // that's where our index.html will be
            contentBase: path.resolve(__dirname, 'dist/render'),
            port: 9000, // serve on port 9000
            hot: true // we want hot reload
        }
    }),
    // add to the render process config
    Object.assign({}, base.render, {
        mode: 'development', // set to development mode
        // add some additional files to pack into our `gui.js` entry point
        entry: {
            gui: [
                // these first two files are required for hot reloading
                // they embed code in the client to talk with the webpack dev server
                'webpack-dev-server/client?http://localhost:9000',
                'webpack/hot/only-dev-server',
                // copy in our existing gui files to pack
                ...base.render.entry.gui
            ]
        },
        plugins: [
            ...base.render.plugins, // copy in the plugins from the render config
            // add the hot module replacement plugin needed for hot reloading
            new webpack.HotModuleReplacementPlugin()
        ]
    })
];