'use strict';

var webpack = require('webpack');

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var precss            = require('precss');
var autoprefixer      = require('autoprefixer');
var path              = require('path');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var historyApiFallback = require('connect-history-api-fallback');

// var helpers = require('./webpack-helpers');
// var TARGET_ENV = helpers.getTargetEnvFromEnvVar();

module.exports = {
    output: {
        filename: '[name].[hash:6].js',
        chunkFilename: '[name]-chunk.[hash:6].js',
        path: path.resolve(__dirname, 'dev')
    },
    entry: {
        app: ['./src/main.ts', './src/vendors.ts']
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        modules: [
            "node_modules"
        ],
        alias: {
            'app': 'app'
        }
    },
    module: {
        rules: [
            {
                test: /sinon.*\.js$/,
                loader: 'imports?define=>false,require=>false'
            },
            {
                test: /\.ts$/,
                exclude: ['node_modules', 'main.aot.ts'],
                loaders: [
                    'awesome-typescript-loader',
                    'angular-router-loader',
                    'angular2-template-loader'
                ]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.scss$/,
                exclude: [/\.global\.scss$/, /\.spinner\.scss$/],
                use: [
                    {loader: 'raw-loader'},
                    {
                        loader: 'postcss-loader',
                        options: {
                            pack: 'cleaner'
                        }
                    },
                    {loader: 'sass-loader'},
                    {loader: 'sass-resources-loader'}
                ]
            },
            {
                test: /\.global\.scss$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'},
                    {
                        loader: 'postcss-loader',
                        options: {
                            pack: 'cleaner'
                        }
                    },
                    {loader: 'sass-loader'}
                ]
            },
            {
                test: /spinner\.scss$/,
                use: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        minimize: false
                    }
                }
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg)(\?\S*)?$/,
                loader: 'url-loader?limit=20000&name=[name].[hash:6].[ext]'
            },
            {
                test: /\.jpe?g$|\.gif$|\.ico$|\.png$/i,
                loader: "file-loader?name=[name].[hash:6].[ext]"
            },
            {
                test: /(app-config\.?\w*\.json$)/i,
                exclude: /(node_modules)/,
                loader: "file-loader?",
                options: {
                    name: 'name=[path][name].[ext]',
                    context: './src/app'
                }
            }
        ]
    },
    devServer: {
        contentBase: './dev'
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                htmlLoader: {
                    ignoreCustomFragments: [/\{\{.*?}}/]
                },
                tslint: {
                    emitErrors: true,
                    failOnHint: false,
                    resourcePath: 'src'
                },
                postcss: function () {
                    return {
                        defaults: [autoprefixer, precss],
                        cleaner:  [autoprefixer({ browsers: ['IE 10', 'IE 11'] })]
                    };
                },
                sassLoader: {
                    includePaths: [path.resolve(__dirname, 'src', 'scss')],
                    context: './'
                },
                sassResources: ['./src/app/styles/variables.scss', './src/app/styles/mixins.scss'],
                context: __dirname
            }
        }),
        new webpack.ProvidePlugin({
            _: 'lodash',
            $: 'jquery',
            jQuery: 'jquery',
            'Tether': 'tether',
            'window.Tether': 'tether'
        }),
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map',
            include: [/app(\..{6})?.js/],
            exclude: ['vendors.js']
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body',
            hash: true
        }),

        // Extracting CSS from application
        new ExtractTextPlugin('[name].css'),

        new BrowserSyncPlugin({
            host: 'localhost',
            port: 8888,
            server: {
                baseDir: 'dev'
            },
            middleware: [historyApiFallback()],
            ui: false,
            online: false,
            notify: false
        })
        // new webpack.DefinePlugin({
        //     TARGET_ENV: JSON.stringify(TARGET_ENV),
        //     'process.env': {
        //         'NODE_ENV': JSON.stringify('production')
        //     }
        // })
    ]
};