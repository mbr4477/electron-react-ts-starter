const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// define the config info common to both the electron main code
// and the electron renderer code
const common = {
    // tell webpack to not override node's path
    // and filename variables with the `context`
    // config (if defined; it isn't defined here)
    node: {
        __dirname: false,
        __filename: false
    },
    // what file extensions are part of this config
    resolve: {
        extensions: [ '.js', '.jsx', '.ts', '.tsx' ]
    },
    module: {
        // define loaders to process each type of file
        rules: [
            // a js, jsx, ts, tsx loader rule
            {
                test: /\.(t|j)sx?$/,    // match these extensions
                loader: 'babel-loader', // use babel for these files.
                // babel compiles fancy javascript to make it
                // compatible with node and standard browsers
                exclude: /node_modules/,// don't try to compile node_modules with this loader
                options: {
                    // don't use a babelrc config file -- all config is here
                    babelrc: false,
                    presets: [
                        // babel env lets us tell babel what envrionment
                        // we want to support on compile
                        // probably not good practice, but i'm not passing
                        // any env parameters to babel here
                        [ '@babel/preset-env' ],
                        // tell babel we want to use typescript
                        '@babel/preset-typescript',
                        // tell babel we are using react (does jsx handling)
                        '@babel/preset-react'
                    ],
                }
            },
            // create a css loader so webpack will pack css into our output
            // css-loader resolves the css imports
            // style-loader packs the css into our output
            {
                test: /\.css$/,
                loaders: [ 'style-loader', 'css-loader' ]
            }
        ]
    }
};

// using common as a base, create a config for the electron main process
const main = Object.assign({
    target: 'electron-main',
    output: {
        filename: '[name].js', // filename will be the name of the `entry` key (i.e., `main.js`)
        path: path.resolve(__dirname, 'dist/main') // put this packed file in dist/main
    },
    entry: {
        main: './src/electron/electron' // point to the electron main process typescript file
    }
}, common);

// using common as a base, create a config for the electron renderer process
const render = Object.assign({
    target: 'electron-renderer',
    output: {
        filename: '[name].js', // filename will be name of `entry` key (i.e., `gui.js`)
        path: path.resolve(__dirname, 'dist/render'), // put the output in dist/render
        // we need to define a publicPath since the webpack-dev-server hot reload function
        // needs to know where to look for the hot reload files. otherwise it will try to
        // load the reload files from the default `/` route on the server
        publicPath: path.resolve(__dirname, 'dist/render')
    },
    entry: {
        // webpack will pack the array contents into a single file
        // we could have multiple keys in the `entry` object to organize
        // the webpack output into multiple files
        gui: [
            '@babel/polyfill', // import babel so we can use fancy js features
            './src/index' // point at our main rendering js file
        ]
    },
    plugins: [
        // this plugin automatically generates an `index.html` for us
        // that imports the webpacked js and css content
        new HtmlWebpackPlugin()
    ]
}, common);

// export the main and render configs so we can use them in the other config files
module.exports = { main: main, render: render };
