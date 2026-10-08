// ============================================
// Configuration ESLint (flat config)
// ============================================

const js = require('@eslint/js');
const globals = require('globals');
const prettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = [
  // 1. Fichiers à ignorer
  {
    ignores: ['node_modules/**', 'coverage/**', 'dist/**', 'build/**', '*.log'],
  },

  // 2. Configuration de base
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'off',
    },
  },

  // 3. Prettier (doit être en dernier)
  prettierRecommended,
];
