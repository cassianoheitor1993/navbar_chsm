import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
    },
  ],
  external: [
    'react',
    'react-router-dom',
    'prop-types',
    'dompurify',
    'bootstrap-icons/font/bootstrap-icons.css',
    'bootstrap/dist/css/bootstrap.min.css'
  ],
  plugins: [
    postcss(),
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-react'],
      extensions: ['.js', '.jsx'],
    }),
  ],
};
