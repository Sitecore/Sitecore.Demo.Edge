module.exports = {
  extends: ["stylelint-config-standard"],
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen",
          "layer",
          "mixin",
          "include",
        ],
      },
    ],
    "no-descending-specificity": null,
    "value-keyword-case": null,
    "function-name-case": null,
  },
};
