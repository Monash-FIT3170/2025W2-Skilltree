import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';
import jsx from 'eslint-plugin-jsx';

export default [
  js.configs.recommended,
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
      'no-multi-spaces': 'error',
      'no-trailing-spaces': 'error',
      'eol-last': ['error', 'always'],
      'indent': ['error', 2]
    }
  },
  {
    ignores: [
      "node_modules/",
      "build/",
      "dist/"
    ]
  },
  {
    files: ["**/*.jsx"],
    rules: {
      'no-unused-vars': 'warn'
    },
    plugins: {
      jsx: jsx
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  }
];