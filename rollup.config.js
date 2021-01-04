export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/bundle.js',
      format: 'esm'
    },
    {
      name: 'color-convert',
      file: 'dist/bundle.cjs',
      format: 'cjs'
    }
  ]
};