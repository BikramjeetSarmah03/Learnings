import antfu from "@antfu/eslint-config";

export default antfu(
  {
    type: "app",
    typescript: true,
    formatters: true,
    stylistic: {
      indent: 2,
      semi: true,
      quotes: "double",
    },
    ignores: ["**/migrations/*"],
  },
  {
    rules: {
      "no-console": ["warn"],
      "no-unused-vars": ["error"],

      "antfu/no-top-level-await": ["off"],

      "node/prefer-global/process": ["off"],
      "node/no-process-env": ["error"],

      "style/eol-last": "off",
      "style/comma-dangle": "off",

      "unicorn/filename-case": [
        "error",
        {
          case: "kebabCase",
          ignore: ["README.md"],
        },
      ],
    },
  }
);
