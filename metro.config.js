const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

// Get the default config from Expo Metro
const baseConfig = getDefaultConfig(__dirname);

// Modify the baseConfig with additional settings
baseConfig.transformer = {
  ...baseConfig.transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer/expo"),
};

baseConfig.resolver = {
  ...baseConfig.resolver,
  assetExts: baseConfig.resolver.assetExts.filter((ext) => ext !== "svg"),
  sourceExts: [...baseConfig.resolver.sourceExts, "svg"],
};

// Wrap the configuration with withNativeWind
module.exports = withNativeWind(baseConfig, { input: "./global.css" });
