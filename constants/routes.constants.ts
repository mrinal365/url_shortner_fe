export const APP_ROUTES = {
  HOME: '/',
  AUTH: {
    LOGIN: '/login',
    SIGNUP: '/signup',
  },
  DASHBOARD: {
    ROOT: '/dashboard',
    URLS: '/dashboard/urls',
    CREATE_URL: '/dashboard/urls/new',
    ANALYTICS: (code: string) => `/dashboard/analytics/${code}`,
    SETTINGS: '/dashboard/settings',
  },
} as const;

export const PUBLIC_ROUTES = [
  APP_ROUTES.HOME,
  APP_ROUTES.AUTH.LOGIN,
  APP_ROUTES.AUTH.SIGNUP,
] as const;
