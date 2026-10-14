'use strict';

const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
  entry: {
    devtools: './src/devtools.ts',
    index: './src/react/index.tsx',
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /(?<!\.d)\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // Injects CSS into the DOM
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: '.',
          to: '.',
          context: 'public',
        },
        {
          from: path.resolve(__dirname, '../src/manifest.json'),
          to: path.resolve(__dirname, '../dist/manifest.json'),
        },
      ],
    }),
  ],
};
