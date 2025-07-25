const BACKGROUND = "#e7e9f9";
const BACKGROUND_DARK = "#060818";

const FOREGROUND = "#070a1d";
const FOREGROUND_DARK = "#e2e5f8";

const PRIMARY = "#1b2269";
const PRIMARY_DARK = "#969ce4";

const ACCENT = "#b22e82";
const ACCENT_DARK = "#d14da0";

const SUCCESS_BACKGROUND = "#5DDA7A";
const SUCCESS_TEXT = "#073B18";

const WARNING_BACKGROUND = "#B3B352";
const WARNING_TEXT = "#3D3D01";

const ERROR_BACKGROUND = "#BB4A45";
const ERROR_TEXT = "#3E0A08";

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
      success: { text: SUCCESS_TEXT, background: SUCCESS_BACKGROUND },
      warning: { text: WARNING_TEXT, background: WARNING_BACKGROUND },
      error: { text: ERROR_TEXT, background: ERROR_BACKGROUND },
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
      success: { text: SUCCESS_BACKGROUND, background: SUCCESS_TEXT },
      warning: { text: WARNING_BACKGROUND, background: WARNING_TEXT },
      error: { text: ERROR_BACKGROUND, background: ERROR_TEXT },
    },
  },
} as const;

export default Colors;
