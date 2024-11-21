import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

export default {
  input: 'src/index.js', // Entry point
  output: [
    {
      file: 'dist/index.cjs.js', // CommonJS
      format: 'cjs',
      exports: 'named',
    },
    {
      file: 'dist/index.esm.js', // ES Modules
      format: 'esm',
      exports: 'named',
    },
  ],
  plugins: [
    peerDepsExternal(), // Automatically mark peer dependencies as external
    resolve(), // Resolve imports
    commonjs(), // Convert CommonJS to ES modules
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env', '@babel/preset-react'],
    }),
    postcss({
      extract: true, // Extract CSS into separate file
      minimize: true, // Minify CSS
    }),
    terser(), // Minify JavaScript
  ],
  external: ['react', 'react-dom'], // Ensure React and React-DOM are not bundled
};
