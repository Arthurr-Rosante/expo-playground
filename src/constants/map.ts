export const DEFAULT_DISTANCE_INTERVAL = 5 as const; // em metros
export const DEFAULT_TIME_INTERVAL = 3000 as const; // em milissegundos
export const DEFAULT_ACCURACY = "Highest" as const;

export const FRAMES_PER_SECOND = {
  low: 30,
  default: 60,
  high: 120,
} as const;

export const ZOOM_CONFIGS = {
  default: 20,
  min: 0,
  max: 24,
} as const;

export const RENDER_RADIUS = {
  small: 500,
  default: 1000,
  large: 2000,
} as const;
