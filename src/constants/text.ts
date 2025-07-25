const FONT_SIZE = {
  title: 32,
  subtitle: 20,
  body: 16,
  small: 12,
  xsmall: 10,
} as const;

const LINE_HEIGHT_RATIO = 1.5 as const;

const TextConfigs = {
  title: {
    fontSize: FONT_SIZE.title,
    lineHeight: FONT_SIZE.title * LINE_HEIGHT_RATIO,
  },
  subtitle: {
    fontSize: FONT_SIZE.subtitle,
    lineHeight: FONT_SIZE.subtitle * LINE_HEIGHT_RATIO,
  },
  body: {
    fontSize: FONT_SIZE.body,
    lineHeight: FONT_SIZE.body * LINE_HEIGHT_RATIO,
  },
  small: {
    fontSize: FONT_SIZE.small,
    lineHeight: FONT_SIZE.small * LINE_HEIGHT_RATIO,
  },
  xsmall: {
    fontSize: FONT_SIZE.xsmall,
    lineHeight: FONT_SIZE.xsmall * LINE_HEIGHT_RATIO,
  },
} as const;

export default TextConfigs;
