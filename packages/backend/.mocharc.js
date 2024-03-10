module.exports = {
  extension: ['mjs'],
  // spec: ['./src/**/__tests__/**/*.mjs'],
  require: [
    'chai/register-expect.js',
    'src/setupTests.mjs'
  ]
};