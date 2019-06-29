const base = require('./webpack.config.base');

// add to the base configs to set to production mode
// use an array so webpack will build both configs
module.exports = [
    Object.assign({}, base.main, {
        mode: 'production'
    }),
    Object.assign({}, base.render, {
        mode: 'production'
    })
];