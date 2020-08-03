import jwt_decode from 'jwt-decode';

import {removeAccessToken} from './local-storage.util';

export interface JwtPayload {
  sub: string,
  first_name: string,
  last_name?: string,
  avatar?: string,
  phone: string,
  iat: number,
  exp: number
}

export function getPayload(): JwtPayload | null {
  const token = localStorage.getItem('access_token');
  if (token && !isTokenExpired()) {
    return jwt_decode(token);
  }
  return null;
}

export function isTokenExpired(): boolean {
  const token = localStorage.getItem('access_token');
  if (token) {
    const payload: JwtPayload = jwt_decode(token);
    const isExpired = payload.exp * 1000 < Date.now();
    if (isExpired) {
      removeAccessToken();
      return true;
    }
    return false;
  }
  return true;
}
