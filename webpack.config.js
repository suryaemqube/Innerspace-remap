// webpack.config.js

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                exclude: ['/node_modules/'],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack']
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: './public/index.html',
        // }),
        // Add a custom webpack plugin to run the prefetching script
        {
            apply: (compiler) => {
                compiler.hooks.beforeCompile.tapAsync(
                    'PrefetchDataPlugin',
                    async (params, callback) => {
                        const { exec } = require('child_process');
                        exec('node prefetchData.js', (err, stdout, stderr) => {
                            if (err) {
                                console.error(err);
                                return;
                            }
                            console.log(stdout);
                            callback();
                        });
                    }
                );
            },
        },
    ],
};
