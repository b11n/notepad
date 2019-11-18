const path = require('path');


module.exports = {
    devtool: 'source-map',
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        publicPath: '/',
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist')
    }
};