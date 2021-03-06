/*
👋 Hi! This file was autogenerated by tslint-to-eslint-config.
https://github.com/typescript-eslint/tslint-to-eslint-config

It represents the closest reasonable ESLint configuration to this
project's original TSLint configuration.

We recommend eventually switching this configuration to extend from
the recommended rulesets in typescript-eslint. 
https://github.com/typescript-eslint/tslint-to-eslint-config/blob/master/docs/FAQs.md

Happy linting! 💖
*/

// This is a workaround for https://github.com/eslint/eslint/issues/3458
require("@rushstack/eslint-config/patch/modern-module-resolution");

module.exports = {
  env: {
    browser: true
  },
  extends: ["@rushstack/eslint-config/profile/web-app"],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: "tsconfig.eslint.json",
    ecmaVersion: 2015
  },
  plugins: [
    "eslint-plugin-import",
    "eslint-plugin-prefer-arrow",
    "eslint-plugin-jsdoc",
    "eslint-plugin-unicorn",
    "eslint-plugin-react"
  ],
  rules: {
    "@typescript-eslint/adjacent-overload-signatures": "error",
    "@typescript-eslint/array-type": [
      "error",
      {
        default: "array"
      }
    ],
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/consistent-type-assertions": "off",
    "@typescript-eslint/dot-notation": "error",
    "@typescript-eslint/explicit-member-accessibility": [
      "error",
      {
        accessibility: "explicit"
      }
    ],
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/member-delimiter-style": [
      "off",
      {
        multiline: {
          delimiter: "none",
          requireLast: true
        },
        singleline: {
          delimiter: "semi",
          requireLast: false
        }
      }
    ],
    "@typescript-eslint/member-ordering": "error",
    "@typescript-eslint/naming-convention": "error",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-misused-new": "error",
    "@typescript-eslint/no-namespace": "error",
    "@typescript-eslint/no-parameter-properties": "off",
    "@typescript-eslint/no-this-alias": "off",
    "@typescript-eslint/no-unused-expressions": "error",
    "@typescript-eslint/no-use-before-define": "error",
    "@typescript-eslint/no-var-requires": "error",
    "@typescript-eslint/prefer-for-of": "error",
    "@typescript-eslint/prefer-function-type": "error",
    "@typescript-eslint/prefer-namespace-keyword": "error",
    "@typescript-eslint/quotes": "off",
    "@typescript-eslint/semi": ["off", null],
    "@typescript-eslint/triple-slash-reference": [
      "error",
      {
        path: "always",
        types: "prefer-import",
        lib: "always"
      }
    ],
    "@typescript-eslint/type-annotation-spacing": "off",
    "@typescript-eslint/unified-signatures": "error",
    "arrow-parens": ["off", "always"],
    "brace-style": ["off", "off"],
    "comma-dangle": "off",
    "complexity": "off",
    "constructor-super": "error",
    "curly": "error",
    "dot-notation": "error",
    "eol-last": "off",
    "eqeqeq": ["error", "smart"],
    "guard-for-in": "error",
    "id-blacklist": "off",
    "id-match": "off",
    "import/no-extraneous-dependencies": "error",
    "import/no-internal-modules": "error",
    "import/order": "off",
    "indent": "off",
    "jsdoc/check-alignment": "error",
    "jsdoc/check-indentation": "error",
    "jsdoc/newline-after-description": "error",
    "linebreak-style": "off",
    "max-classes-per-file": ["error", 1],
    "max-len": "off",
    "new-parens": "off",
    "newline-per-chained-call": "off",
    "no-bitwise": "error",
    "no-caller": "error",
    "no-cond-assign": "error",
    "no-console": [
      "error",
      {
        allow: [
          "log",
          "warn",
          "dir",
          "timeLog",
          "assert",
          "clear",
          "count",
          "countReset",
          "group",
          "groupEnd",
          "table",
          "info",
          "dirxml",
          "error",
          "groupCollapsed",
          "Console",
          "profile",
          "profileEnd",
          "timeStamp",
          "context"
        ]
      }
    ],
    "no-debugger": "error",
    "no-duplicate-case": "error",
    "no-duplicate-imports": "error",
    "no-empty": "off",
    "no-empty-function": "off",
    "no-eval": "error",
    "no-extra-bind": "error",
    "no-extra-semi": "off",
    "no-fallthrough": "off",
    "no-invalid-this": "off",
    "no-irregular-whitespace": "off",
    "no-multiple-empty-lines": "off",
    "no-new-func": "error",
    "no-new-wrappers": "error",
    "no-redeclare": "error",
    "no-return-await": "error",
    "no-sequences": "error",
    "no-shadow": "error",
    "no-sparse-arrays": "error",
    "no-template-curly-in-string": "error",
    "no-throw-literal": "error",
    "no-trailing-spaces": "off",
    "no-undef-init": "error",
    "no-underscore-dangle": "off",
    "no-unsafe-finally": "error",
    "no-unused-expressions": "error",
    "no-unused-labels": "error",
    "no-use-before-define": "error",
    "no-var": "error",
    "object-shorthand": "error",
    "one-var": ["error", "never"],
    "padded-blocks": [
      "off",
      {
        blocks: "never"
      },
      {
        allowSingleLineBlocks: true
      }
    ],
    "prefer-arrow/prefer-arrow-functions": "off",
    "prefer-const": "off",
    "prefer-object-spread": "error",
    "quote-props": "off",
    "quotes": "off",
    "radix": "error",
    "react/jsx-curly-spacing": "off",
    "react/jsx-equals-spacing": "off",
    "react/jsx-tag-spacing": [
      "off",
      {
        afterOpening: "allow",
        closingSlash: "allow"
      }
    ],
    "react/jsx-wrap-multilines": "off",
    "semi": "off",
    "space-before-function-paren": "off",
    "space-in-parens": ["off", "never"],
    "spaced-comment": [
      "error",
      "always",
      {
        line: {
          exceptions: ["-", "/"],
          markers: ["/"]
        },
        block: {
          exceptions: ["="],
          balanced: true
        }
      }
    ],
    "unicorn/prefer-ternary": "error",
    "use-isnan": "error",
    "valid-typeof": "off"
  }
};
