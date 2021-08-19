import * as webpack from "webpack";
import * as path from "path";
import * as ts from "typescript";
import { createTransformer } from "static-injector/transform";
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
};

export default config;
