'use strict';

const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const glob = require('glob');

const entries = glob.sync("./src/**/*.ts", { "dotRelative": true, posix: true }).reduce((files, filePath) => {
   console.log(filePath);
   const parts = filePath.split("/");
   const entryName = parts.at(-1).split(".")[0];

   files[entryName] = filePath;
   return files;
}, {});

console.log(entries);

module.exports = {
   mode: "production",
   entry: entries,
   output: {
      path: path.join(__dirname, "../dist"),
      filename: "[name].js",
   },
   resolve: {
      extensions: [".ts", ".js"],
   },
   module: {
      rules: [
         {
            test: /\.tsx?$/,
            loader: "ts-loader",
            exclude: /node_modules/,
         },
      ],
   },
   plugins: [
      new CopyPlugin({
         patterns: [
            {
               from: ".",
               to: ".", context: "public",
            },
            {
               from: path.resolve(__dirname, '../src/manifest.json'),
               to: path.resolve(__dirname, '../dist/manifest.json')
            },
         ]
      }),
   ],
};