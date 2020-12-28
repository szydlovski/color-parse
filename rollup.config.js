export default {
  input: 'src/index.js',
  output: [
    {
      file: 'esm/bundle.js',
      format: 'esm'
    },
    {
      name: 'color-parse',
      file: 'umd/bundle.js',
      format: 'umd'
    }
  ]
};