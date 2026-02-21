module.exports = function (api) {
  api.cache(true);
  const isNative = api.caller((caller) => caller && (caller.platform === 'ios' || caller.platform === 'android'));
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "react-native-reanimated/plugin",
        {
          relativeSourceLocation: true,
        },
      ],
      ...(isNative ? ["nativewind/babel"] : []),
    ],
    env: {
      production: {
        plugins: ["react-native-reanimated/plugin"],
      },
    },
  };
};
