// eslint.config.js — Flat config for ESLint v9
import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import vitestGlobals from 'eslint-plugin-vitest-globals';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  // Ignore build artifacts
  { ignores: ['dist/**', '.vite/**', 'coverage/**', 'node_modules/**'] },

  // Base JS rules
  js.configs.recommended,

  // React (enables JSX parsing and sensible React rules)
  react.configs.flat.recommended,

  // App/browser files
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // React Hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      // No need to import React with new JSX transform
      'react/react-in-jsx-scope': 'off',
    },
    settings: { react: { version: 'detect' } },
  },

  // Tests: allow Vitest globals (test, expect, vi, beforeEach, etc.)
  {
    files: ['src/__tests__/**/*.{js,jsx}', 'src/**/*.{test,spec}.{js,jsx}'],
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: {
        ...globals.browser,
        ...vitestGlobals.environments.env.globals,
      },
    },
  },

  // Node files: allow process, module, etc.
  {
    files: [
      'server.js',
      'vite.config.{js,cjs,mjs}',
      'vitest.config.{js,cjs,mjs}',
    ],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
];
