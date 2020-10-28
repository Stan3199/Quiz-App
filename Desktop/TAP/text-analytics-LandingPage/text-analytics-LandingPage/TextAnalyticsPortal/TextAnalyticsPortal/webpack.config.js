const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require('compression-webpack-plugin');
const DIST_DIR = path.resolve(__dirname, "wwwroot");
const SRC_DIR = path.resolve(__dirname, "scripts");

var config = {
    watch: true,
    mode: 'development',
    entry: [
        SRC_DIR + "/react/rootContainer.js"
    ],
    output: {
        path: DIST_DIR + "/dist/app",
        filename: "bundle.js",
        publicPath: process.env.ASSET_PATH || '/app/'
    },
    plugins: [
        new CompressionPlugin({
            deleteOriginalAssets: true,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: SRC_DIR,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ["@babel/preset-env", {
                                "targets": {
                                    "browsers": [
                                        ">0.25%",
                                        "not ie 11",
                                        "not op_mini all"
                                    ]
                                }
                            }],
                            "@babel/preset-react"
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            },
            {
                test: /\.(jpg|png|gif|svg|pdf|ico)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|png|gif|svg|pdf|ico)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    }
                ]
            }
        ]
    }
};

module.exports = config;