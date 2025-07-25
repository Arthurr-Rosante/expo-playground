const BACKGROUND = "#e7e9f9";
const BACKGROUND_DARK = "#060818";

const FOREGROUND = "#070a1d";
const FOREGROUND_DARK = "#e2e5f8";

const PRIMARY = "#1b2269";
const PRIMARY_DARK = "#969ce4";

const ACCENT = "#b22e82";
const ACCENT_DARK = "#d14da0";

const SUCCESS = "#5dda7a";
const SUCCESS_DARK = "#92e58b";

const ERROR = "#bb4a45";
const ERROR_DARK = "#db726e";

const Colors = {
  light: {
    background: BACKGROUND,
    foreground: FOREGROUND,
    primary: PRIMARY,
    accent: ACCENT,
    text: FOREGROUND,
    highlight: {
      primary: PRIMARY + "80",
      accent: ACCENT + "80",
    },
    ui: {
      success: SUCCESS,
      error: ERROR,
    },
  },
  dark: {
    background: BACKGROUND_DARK,
    foreground: FOREGROUND_DARK,
    primary: PRIMARY_DARK,
    accent: ACCENT_DARK,
    text: FOREGROUND_DARK,
    highlight: {
      primary: PRIMARY_DARK + "80",
      accent: ACCENT_DARK + "80",
    },
    ui: {
      success: SUCCESS_DARK,
      error: ERROR_DARK,
    },
  },
} as const;

export default Colors;
