const ACCESS_TOKEN = 'access_token';

export const setAccessToken = (token: string) => {
  localStorage.setItem(ACCESS_TOKEN, token);
}

export const getAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN);
}

export const removeAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN);
}

export const containsAccessToken = (): boolean => {
  return localStorage.getItem(ACCESS_TOKEN) !== null;
}
