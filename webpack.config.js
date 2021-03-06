const path = require( 'path' );
const HTMLWebpackPlugin = require( 'html-webpack-plugin' );

const NODE_ENV = process.env.NODE_ENV;
const isDev = NODE_ENV === 'development';
const isProd = NODE_ENV === 'production';

function setupDevtool() {
    if ( isDev ) return 'eval';
    if ( isProd ) return false;
}

module.exports = {
    resolve: {
        extensions: [ '.js', '.jsx', '.ts', '.tsx', '.json' ]
    },
    mode: NODE_ENV ? NODE_ENV : 'development',
    entry: path.resolve( __dirname, 'src/index.jsx' ),
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.[tj]sx?$/,
                use: [ 'ts-loader' ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                mode: 'local',
                                localIdentName: '[name]__[local]--[hash:base64:5]',
                            },
                            sourceMap: true,
                        },

                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            postcssOptions: {
                                plugins: [
                                    [
                                        'autoprefixer',
                                        {
                                            cascade: false,
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ]
            },
        ]
    },
    plugins: [
        new HTMLWebpackPlugin( { template: path.resolve( __dirname, 'index.html' ) } )
    ],
    devServer: {
        port: 3000,
        open: true,
        hot: isDev
    },
    devtool: setupDevtool(),
};
