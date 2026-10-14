export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const API_TIMEOUT = 15000;

export const TOKEN_KEY = 'token_key';
export const token_key = TOKEN_KEY;

export const STORAGE_KEYS = {
  TOKEN: TOKEN_KEY,
  TOKEN_KEY: TOKEN_KEY,
  THEME: 'url_shortener_theme',
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    SIGNUP: '/api/auth/signup',
    ME: '/api/auth/me',
  },
  URLS: {
    BASE: '/api/urls',
    GET_ALL: '/api/urls',
    GET_ONE: (idOrCode: string | number) => `/api/urls/${idOrCode}`,
    CREATE: '/api/urls',
    UPDATE: (id: string | number) => `/api/urls/${id}`,
    DELETE: (id: string | number) => `/api/urls/${id}`,
    ANALYTICS: (idOrCode: string | number) => `/api/urls/${idOrCode}/analytics`,
    CUSTOM_ALIAS_CHECK: (alias: string) => `/api/urls/check-alias/${alias}`,
  },
  HEALTH: '/health',
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;
