import { resolve } from "path";
import { ConfigurationFactory } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import GenerateJsonPlugin from "generate-json-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

const config: ConfigurationFactory = (_env, args) => {
    const isProd = args.mode === "production";

    const buildDir = resolve(__dirname);
    const srcDir = resolve(__dirname, "../src");
    const distDir = resolve(__dirname,
        "../dist", isProd ? "prod" : "dev");

    const appTitle = isProd ? "Bing At Work" : "Bing At Work (DEV)";
    const tsConfigFile = isProd
        ? resolve(buildDir, "tsconfig.prod.json")
        : resolve(buildDir, "tsconfig.dev.json");

    const packageJson = require(resolve(__dirname, "../package.json"));
    const manifestJson = require(resolve(srcDir, "manifest-template.json"));
    const transformManifestFields = (key: string, value: string) => {
        const { version, description, homepage, author } = packageJson;
        switch (value) {
            case "__NAME__": return appTitle;
            case "__VERSION__": return version;
            case "__DESCRIPTION__": return description;
            case "__HOMEPAGE_URL__": return homepage;
            case "__AUTHOR__": return author.name;
            default: return value
        }
    };
    const manifestIconSrc = resolve(srcDir, "assets/manifest-icons",
        isProd ? "prod" : "dev");
    const manifestIconDist = resolve(distDir, "assets/manifest-icons");

    return {
        entry: {
            popup: resolve(srcDir, "browser-action/index.tsx"),
            content: resolve(srcDir, "content-script/index.tsx")
        },
        output: {
            filename: "[name].js",
            path: distDir
        },
        module: {
            rules: [{
                test: /\.tsx?$/,
                use: [{
                    loader: "ts-loader",
                    options: {
                        configFile: tsConfigFile
                    }
                }],
                exclude: /node_modules/
            }]
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js"]
        },
        devtool: isProd ? undefined : "inline-source-map",
        plugins: [
            new HtmlWebpackPlugin({
                filename: "popup.html",
                template: resolve(srcDir, "browser-action/index.html"),
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
            }),
            new GenerateJsonPlugin(
                "manifest.json", manifestJson, transformManifestFields, 4
            ),
            new CopyPlugin([
                { from: manifestIconSrc, to: manifestIconDist }
            ])
        ]
    };
};

export default config;
