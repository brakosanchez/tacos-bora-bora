import { getCookie, setCookie, deleteCookie } from 'cookies-next';

export const getAccessToken = async () => {
  const token = await getCookie('access_token');
  return token ? token.toString() : null;
};

export const setAccessToken = async (token: string) => {
  await setCookie('access_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7 // 7 días
  });
};

export const clearAccessToken = async () => {
  await deleteCookie('access_token');
};
