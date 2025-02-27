export const API_ROUTES = {
  AUTH: {
    LOGIN: `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
  },
  DASHBOARD: {
    SUMMARY: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/summary`,
    STAT: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/stat`,
  },
  ONBOARDING: {
    POST: `${process.env.NEXT_PUBLIC_BASE_URL}/offers`,
  },
  USERS: {
    GET: `${process.env.NEXT_PUBLIC_BASE_URL}/users`,
  },
  OFFERS: {
    GET: `${process.env.NEXT_PUBLIC_BASE_URL}/offers`,
  },
};
