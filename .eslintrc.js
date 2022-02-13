module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'prettier'],
  env: {
    browser: true,
    es6: true,
  },
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3',
    },
  ],
  plugins: ['svelte3', '@typescript-eslint', 'prettier'],
  settings: {
    'svelte3/typescript': require('typescript'),
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    extraFileExtensions: ['.svelte'],
  },
  ignorePatterns: ['node_modules'],
};
