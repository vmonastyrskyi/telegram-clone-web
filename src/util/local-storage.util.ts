const ACCESS_TOKEN = 'access_token';
const SELECTED_DIALOG = 'selected_dialog';

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

export const setSelectedDialog = (id: string) => {
  localStorage.setItem(SELECTED_DIALOG, id);
}

export const getSelectedDialog = (): string | null => {
  return localStorage.getItem(SELECTED_DIALOG);
}

export const containsSelectedDialog = (): boolean => {
  return localStorage.getItem(SELECTED_DIALOG) !== null;
}
