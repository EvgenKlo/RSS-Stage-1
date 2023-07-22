module.exports = {
  'env': {
      'browser': true,
      'es2021': true
  },
  'extends': [
    'airbnb-base',
    "airbnb-typescript/base",
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  'overrides': [
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
      'ecmaVersion': 'latest',
      'sourceType': 'module',
      project: './tsconfig.json'
  },
  'plugins': [
    'prettier',
    '@typescript-eslint'
  ],
  'rules': {
    '@typescript-eslint/no-explicit-any': 'error',
    'max-lines-per-function': ['error', 40]
  }
};
