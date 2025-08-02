const DEFAULT_MESSAGE = "Algo deu errado...";

export function handleApiError(error: any, defaultMessage = DEFAULT_MESSAGE) {
  // === Caso receba 'errorMessages'
  if (error?.errorMessages && Array.isArray(error.errorMessages)) {
    return new Error(error.errorMessages.join("\n"));
  }

  // === Caso receba apenas 'message'
  if (error?.message) {
    return new Error(error.message);
  }

  if (__DEV__) {
    console.error("Erro inesperado: ", JSON.stringify(error, null, 2));
  }

  return new Error(defaultMessage);
}