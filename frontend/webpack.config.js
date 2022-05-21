const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { UnusedFilesWebpackPlugin } = require('unused-files-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: { main: './src/app/index.jsx' },
    output: {
        path: path.resolve(__dirname, '../frontend-testnet'),
        publicPath: '/',
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
                resolve: {
                    extensions: ['.js', '.jsx'],
                },
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: { minimize: true },
                    },
                ],
            },
            {
                test: /\.(ttf|woff|woff2|eot|png|jpg|jpeg|gif|svg|base64|mp4|pdf|ico)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            limit: 1000000,
                        }
                    }
                ]
            },
            // {
            //     test: /\.(ttf|woff|woff2|eot|png|jpg|jpeg|gif|svg|base64|mp4)$/,
            //     use: [
            //         {
            //             loader: 'url-loader',
            //             options: {
            //                 limit: 1000000,
            //             },
            //         },
            //     ],
            // },
            {
                test: /\.scss|css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]',
                            },
                        },
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
        ],
    },
    devServer: {
        historyApiFallback: true,
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                '**/*',
                '!.git/**',
                '!.idea/**',
                '!.gitignore',
                '!vercel.json',
            ]
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
        }),
        new WebpackMd5Hash(),
        new UnusedFilesWebpackPlugin({
            patterns: ['src/app/**/*.*']
        }),
        new Dotenv()
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
};
