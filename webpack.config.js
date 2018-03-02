const tsImportPluginFactory = require('ts-import-plugin');

module.exports = {
    entry: "./src/demo.tsx",
    output: {
        filename: "./dist/demo.js",
        library: 'selectCity',
    },
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            { test: 
                /\.tsx?$/, 
                loader: "ts-loader", 
                options: {
                    transpileOnly: true,
                    getCustomTransformers: () => ({
                      before: [ tsImportPluginFactory({
                        libraryName: 'antd',
                        libraryDirectory: 'lib',
                        style: 'css'
                      }) ]
                    }),
                    compilerOptions: {
                      module: 'es2015'
                    }
                  },
                  exclude: /node_modules/,
            },
            {
                test: /.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
        ]
    },
    devtool: 'cheap-module-source-map',
    externals : {
        // react: 'react',
        // 'react-dom': 'react-dom',
        // 'whatwg-fetch': 'whatwg-fetch',
        // 'antd/lib/input/index':'antd/lib/input/index',
        // 'antd/lib/spin/index': 'antd/lib/spin/index',
        // 'antd/lib/table/index': 'antd/lib/table/index',
    }
};