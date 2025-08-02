import { ConfigContext, ExpoConfig } from "@expo/config";
import { version } from "./package.json";

// === ENVIRONMENT VARIABLES ================================================ //
const ENV = process.env.APP_ENV;
const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

// === GENERAL APP CREDENTIALS ============================================== //
const PROJECT_ID = "5c696ce3-7def-4acc-ad40-e63324b1a0dd" as const;
const SLUG = "expo-playground" as const;
const OWNER = "vialimao" as const;

const NAME = "expo-playground" as const;
const BUNDLE = "com.expo.playground" as const;
const PACKAGE = "com.expo.playground" as const;
const SCHEME = "expo-playground-scheme" as const;

// === UI RELATED =========================================================== //
const ICON = "./src/assets/images/icon.png" as const;
const ADAPTIVE_ICON = "./src/assets/images/adaptive-icon.png" as const;
const APP_BACKGROUND_COLOR = "#ffffff" as const;

// ========================================================================== //
// === APP.CONFIG.TS ======================================================== //
const config = ({ config }: ConfigContext): ExpoConfig => {
  console.log("⚙️ - Building app for environment:", process.env.APP_ENV);

  const { NAME, BUNDLE, PACKAGE, SCHEME } = getDynamicAppConfig(
    (ENV as "development" | "production" | "preview") || "development"
  );

  return {
    // === GENERAL VALUES & CONFIGURATIONS ================================== //
    ...config,
    name: NAME,
    slug: SLUG,
    owner: OWNER,
    scheme: SCHEME,
    icon: ICON,
    version: version,
    orientation: "portrait", //       --> ["portrait" | "default" | "landscape"]
    userInterfaceStyle: "automatic", //     --> ["automatic" | "dark" | "light"]
    newArchEnabled: true,

    // === IOS CONFIGURATIONS =============================================== //
    ios: {
      scheme: SCHEME,
      bundleIdentifier: BUNDLE,
      supportsTablet: true,
      config: {
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
      },
    },

    // === ANDROID CONFIGURATIONS =========================================== //
    android: {
      package: PACKAGE,
      googleServicesFile: "",
      adaptiveIcon: {
        foregroundImage: ADAPTIVE_ICON,
        backgroundColor: APP_BACKGROUND_COLOR,
      },
      config: {
        googleMaps: {
          apiKey: GOOGLE_MAPS_API_KEY,
        },
      },
      permissions: [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "ACCESS_BACKGROUND_LOCATION",
        "FOREGROUND_SERVICE",
      ],
    },

    // === WEB CONFIGURATIONS =============================================== //
    web: {
      bundler: "metro", // --> ["metro" | "webpack"]
      output: "static", // --> ["static" | "single" | "server"]
      favicon: "./src/assets/images/favicon.png",
    },

    // === UPDATES CONFIGURATIONS =========================================== //
    updates: {
      url: `https://u.expo.dev/${PROJECT_ID}`,
    },

    // === PLUGINS CONFIGURATIONS =========================================== //
    plugins: [
      // === EXPO ROUTER === //
      "expo-router",

      // === EXPO SPLASH SCREEN === //
      [
        "expo-splash-screen",
        {
          image: "./src/assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: APP_BACKGROUND_COLOR,
        },
      ],

      // === EXPO LOCATION === //
      [
        "expo-location",
        {
          locationAlwaysAndWhenInUsePermission: `Allow ${NAME} to use your location`,
          isIosBackgroundLocationEnabled: false,
          isAndroidBackgroundLocationEnabled: false,
        },
      ],

      // === EXPO MAPS === //
      [
        "expo-maps",
        {
          requestLocationPermission: true,
          locationPermission: `Allow ${NAME} to use your location`,
        },
      ],

      // === MAPLIBRE REACT NATIVE === //
      ["@maplibre/maplibre-react-native"],

      // === EXPO FONTS === //
      // [
      //   "expo-font",
      //   {
      //     fonts: [
      //       {
      //         fontFamily: "SpaceMono",
      //         fontDefinitions: [
      //           {
      //             path: "./src/assets/fonts/SpaceMono-Regular.ttf",
      //             weight: 400,
      //             style: 'normal',
      //           },
      //         ],
      //       },
      //     ],
      //   },
      // ],
    ],

    // === EXTRA CONFIGURATIONS ============================================= //
    extra: {
      eas: {
        projectId: PROJECT_ID,
      },
    },

    // === EXPERIMENTS CONFIGURATIONS ======================================= //
    experiments: {
      typedRoutes: true,
      tsconfigPaths: true,
    },
  };
};
export default config;
// ========================================================================== //

// === GET DYNAMIC APP CONFIGURATION === //
function getDynamicAppConfig(env: "development" | "production" | "preview") {
  if (env === "production") {
    return {
      NAME: NAME,
      BUNDLE: BUNDLE,
      PACKAGE: PACKAGE,
      SCHEME: SCHEME,
    };
  }

  if (env === "preview") {
    return {
      NAME: `${NAME} Preview`,
      BUNDLE: `${BUNDLE}.prev`,
      PACKAGE: `${PACKAGE}.prev`,
      SCHEME: `${SCHEME}-prev`,
    };
  }

  // === DEFAULTS TO DEVELOPMENT === //
  return {
    NAME: `${NAME} Development`,
    BUNDLE: `${BUNDLE}.dev`,
    PACKAGE: `${PACKAGE}.dev`,
    SCHEME: `${SCHEME}-dev`,
  };
}
