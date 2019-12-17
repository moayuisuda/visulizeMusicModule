const path = require('path')
const HtmlPlug = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'synth.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map',

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                  {
                    loader: "style-loader"
                  },
                  {
                    loader: "css-loader"
                  },
                  {
                    loader: "sass-loader"
                  }
                ]
              }
        ]
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },

    plugins: [
        new HtmlPlug({
            template: 'template.html',
            filename: 'index.html'
        }),
        new CleanWebpackPlugin({
            title: 'synth'
        })
    ],

    devServer: {
        contentBase: path.join(__dirname, 'dist')
    }


}