import * as webpack from "webpack";
import * as path from "path";
import * as ts from "typescript";
import { createTransformer } from "static-injector/transform";
import HtmlWebpackPlugin from "html-webpack-plugin";
const config: webpack.Configuration = {
  mode: "production",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /.ts$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: "tsconfig.build.json",
              getCustomTransformers: (program: ts.Program) => ({ before: [createTransformer(program)] }),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  resolve: {
    extensions: [".js", ".ts"],
  },
};

export default config;
