import jwt_decode from 'jwt-decode';

export interface JwtPayload {
  readonly sub: string,
  readonly first_name: string,
  readonly last_name?: string,
  readonly avatar?: string,
  readonly phone: string,
  readonly iat: number,
  readonly exp: number
}

export function getPayload(): JwtPayload | null {
  const token = localStorage.getItem('access_token');
  if (token && !isTokenExpired) {
    return jwt_decode(token);
  }
  return null;
}

export function isTokenExpired(): boolean {
  const token = localStorage.getItem('access_token');
  if (token) {
    const payload: JwtPayload = jwt_decode(token);
    return payload.exp * 1000 < Date.now();
  }
  return true;
}
