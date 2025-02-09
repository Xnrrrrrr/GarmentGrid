module.exports = {                        // auto created by vite upon isntallation
  root: true,
  env: { browser: true, es2020: true },  // allows us to use enviroment variables, .env for example for front end
  extends: [
    'eslint:recommended',               // configs for node modules
    'plugin:react/recommended',         // configs for node modules
    'plugin:react/jsx-runtime',         // configs for node modules
    'plugin:react-hooks/recommended',   // configs for node modules
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
