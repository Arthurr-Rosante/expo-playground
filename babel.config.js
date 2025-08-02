module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // === AVISO: deve ser listado por último === //
      "react-native-reanimated/plugin",
    ],
  };
};
