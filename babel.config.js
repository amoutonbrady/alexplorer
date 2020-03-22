module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        bugfixes: true,
        targets: {
          chrome: "73",
          node: "11"
        }
      }
    ],
    "@babel/preset-typescript",
    "babel-preset-solid"
  ]
};
