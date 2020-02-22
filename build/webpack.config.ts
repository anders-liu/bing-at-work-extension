import { resolve } from "path";
import { ConfigurationFactory } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

const config: ConfigurationFactory = (_env, args) => {
    const isProd = args.mode === "production";

    const srcDir = resolve(__dirname, "../src");
    const distDir = resolve(__dirname,
        "../dist", isProd ? "prod" : "dev");

    const appTitle = isProd ? "Bing At Work" : "Bing At Work (DEV)";

    return {
        entry: {
            popup: resolve(srcDir, "browser-action/index.ts"),
            content: resolve(srcDir, "content-script/index.ts")
        },
        output: {
            filename: "[name].js",
            path: distDir
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: "popup.html",
                title: appTitle,
                chunks: ["popup"],
                minify: isProd ? {
                    collapseWhitespace: true,
                    removeComments: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    useShortDoctype: true
                } : undefined
            })
        ]
    };
};

export default config;
