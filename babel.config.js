module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      // === AVISO: deve ser listado por último === //
      "react-native-worklets/plugin",
    ],
  };
};
