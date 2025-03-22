module.exports = {
    globals: {
        page: true,
        REACT_APP_ENV: true,
        React: true,
    },
    env: {
        browser: true,
        es2020: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
    ],
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint/eslint-plugin',
        'react',
        'react-hooks',
    ],
    ignorePatterns: ['es', 'lib', 'dist', '.eslintrc.js'],
    rules: {
        'react/no-unknown-property': ['error', { ignore: ['css'] }],
        '@typescript-eslint/consistent-type-imports': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/ban-ts-comment': 0,
        '@typescript-eslint/no-empty-interface': 0,
        '@typescript-eslint/ban-types': 0,
        'no-unused-vars': 0,
        '@typescript-eslint/no-unused-vars': 0,
        'react/button-has-type': 0,
        'react/display-name': 0,
    },
};
