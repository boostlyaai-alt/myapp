module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel",
      [
        "react-native-reanimated/plugin",
        {
          relativeSourceLocation: true,
        },
      ],
    ],
    env: {
      production: {
        plugins: [
          "nativewind/babel",
          "react-native-reanimated/plugin",
        ],
      },
    },
  };
};
