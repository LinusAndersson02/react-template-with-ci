import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import prettier from 'eslint-config-prettier';

export default [
    // Ignore build artifacts
    {
        ignores: [
            'dist/**',
            'node_modules/**',
            'coverage/**',
            'public/**',
            'eslint.config.js',
            'vite.config.*',
            'vitest.config.*',
            '**/*.config.*',
        ],
    },

    // Base JS rules
    js.configs.recommended,

    // TypeScript rules (type-aware)
    ...tseslint.configs.recommendedTypeChecked,

    // React + Hooks + a11y
    {
        plugins: {
            react,
            'react-hooks': reactHooks,
            'jsx-a11y': jsxA11y,
        },
        settings: { react: { version: 'detect' } },
        rules: {
            // React 17+ (automatic JSX transform)
            'react/react-in-jsx-scope': 'off',
            'react/jsx-uses-react': 'off',

            // Hooks
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

            // Accessibility
            'jsx-a11y/alt-text': 'warn',
            'jsx-a11y/anchor-is-valid': 'warn',
            'jsx-a11y/no-autofocus': 'off', // enable if you prefer
        },
    },

    // Import hygiene + unused imports
    {
        plugins: { import: importPlugin, 'unused-imports': unusedImports },
        rules: {
            'unused-imports/no-unused-imports': 'warn',
            'unused-imports/no-unused-vars': [
                'warn',
                { args: 'after-used', argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
            ],
            'import/order': [
                'warn',
                {
                    groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                    'newlines-between': 'always',
                    alphabetize: { order: 'asc', caseInsensitive: true },
                },
            ],
        },
    },

    // Language options (TypeScript project + globals)
    {
        languageOptions: {
            globals: { ...globals.browser, ...globals.node },
            parserOptions: {
                // point at your tsconfigs that include "src"
                project: ['./tsconfig.app.json', './tsconfig.node.json'],
                tsconfigRootDir: process.cwd(),
            },
        },
    },

    // Disable rules that conflict with Prettier
    prettier,
];
