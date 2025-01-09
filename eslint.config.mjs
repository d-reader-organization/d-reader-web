import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import nextPlugin from '@next/eslint-plugin-next'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
})

export default [
  ...compat.config({
    extends: ['next', 'next/core-web-vitals', 'plugin:@typescript-eslint/recommended', 'prettier'],
    plugins: ['@typescript-eslint'],
  }),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['node_modules/**', 'build', 'next-env.d.ts', 'next-config.ts'],
    rules: {
      '@next/next/no-img-element': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { caughtErrors: 'all', caughtErrorsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      'react-hooks/exhaustive-deps': 'warn',
      'import/no-cycle': ['error', { maxDepth: Infinity }],
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      '@next/next': nextPlugin,
    },
  },
]
