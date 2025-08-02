export type FormCredentials = {
  email: string;
  password: string;
  confirmPassword?: string;
};

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type ApiErrorResponse = {
  errorMessages?: string[];
  message?: string;
  status?: string;
};
