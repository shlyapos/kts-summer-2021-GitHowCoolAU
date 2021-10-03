const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ForkTsCheckerPlugin = require("fork-ts-checker-webpack-plugin");


const buildPath = path.resolve(__dirname, "dist");
const srcPath = path.resolve(__dirname, "src");


const isProd = process.env.NODE_ENV === "production";

const plugins = [
    new HtmlWebpackPlugin({
        template: path.join(srcPath, "index.html")
    }),
    !isProd && new ReactRefreshPlugin(),
    new MiniCssExtractPlugin({
        filename: '[name]-[hash].css'
    }),
    new ForkTsCheckerPlugin()
].filter(Boolean);


const getSettingsForStyle = (withModules = false) => {
    return [
        MiniCssExtractPlugin.loader,
        !withModules ? "css-loader" : {
            loader: "css-loader",
            options: {
                modules: {
                    localIdentName: !isProd ? 
                        '[path][name]__[local]' : 
                        '[hash:base64]'
                }
            }
        },
        {
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: ['autoprefixer']
                }
            }
        },
        "sass-loader"
    ]
}


module.exports = {
    entry: path.resolve(srcPath, "index.tsx"),
    target: process.env.NODE_ENV === "production" ? "web" : "browserslist",
    output: {
        path: buildPath,
        filename: "bundle.js"
    },
    devServer: {
        host: "127.0.0.1",
        port: 8800,
        hot: true
    },
    plugins,
    resolve: {
        extensions: ['.jsx', '.js', '.tsx', '.ts'],
        alias: {
            components: path.join(srcPath, "components"),
            config: path.join(srcPath, "config"),
            styles: path.join(srcPath, "styles"),
            utils: path.join(srcPath, "utils"),
            pages: path.join(srcPath, "pages/App"),
            app: path.join(srcPath, "App"),
            shared: path.join(srcPath, "shared"),
            store: path.join(srcPath, "store"),
            root: path.join(srcPath, "root")
        }
    },
    module: {
        rules: [
            {
                test: /\.([jt])sx?$/,
                use: "babel-loader"
            },
            {
                test: /\.s?css$/,
                exclude: /\.modules\.s?css$/,
                use: getSettingsForStyle()
            },
            {   // css-modules
                test: /\.modules\.s?css$/,
                use: getSettingsForStyle(true)
            },
            {
                test: /\.(png|svg|jpg)$/,
                type: 'asset/resource'
            }
        ]
    }
}