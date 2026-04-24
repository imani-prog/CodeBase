import { useContext, createContext, useEffect, useRef, useState } from 'react';
import {
  authApi,
  configureHttpClientHandlers,
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setTokens,
} from '../API/index.js';

const AuthContext = createContext();
const AUTH_USER_KEY = 'authUser';

const readStoredAuthUser = () => {
  try {
    const raw = window.localStorage.getItem(AUTH_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    try { window.localStorage.removeItem(AUTH_USER_KEY); } catch { /* ignore */ }
    return null;
  }
};

const mapProfileToAuthUser = (profile) => {
  const root = profile?.data ?? profile?.user ?? profile;
  const role = String(root?.role ?? '').toLowerCase();
  return {
    id:       root?.id ?? root?.userId ?? null,
    username: root?.username ?? root?.fullName ?? root?.name ?? 'User',
    role,
    email:    root?.email ?? '',
    token:    getAccessToken() ?? '',
  };
};

const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  try {
    const payload = await authApi.refresh({ refreshToken });
    const nextAccessToken = payload?.accessToken || payload?.token;
    if (!nextAccessToken) return false;

    setTokens({
      accessToken:  nextAccessToken,
      refreshToken: payload?.refreshToken || refreshToken,
    });
    return true;
  } catch {
    clearTokens();
    return false;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => readStoredAuthUser());


  const onUnauthorizedRef = useRef(null);
  onUnauthorizedRef.current = () => {
    setUser(null);
    clearTokens();
    window.localStorage.removeItem(AUTH_USER_KEY);
    window.location.href = '/login';
  };

  useEffect(() => {
    configureHttpClientHandlers({
      refresh: refreshAccessToken,
      onUnauthorized: () => onUnauthorizedRef.current(),
    });
  }, []);


  useEffect(() => {
    if (user || !getAccessToken()) return;

    let active = true;

    (async () => {
      try {
        const profile = await authApi.me();
        if (!active) return;
        setUser(mapProfileToAuthUser(profile));
      } catch (err) {
        if (!active) return;

        if (err?.status === 401) {
          clearTokens();
          window.localStorage.removeItem(AUTH_USER_KEY);
        }
      }
    })();

    return () => { active = false; };
  }, [user]);


  useEffect(() => {
    try {
      if (user) {
        window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
      } else {
        window.localStorage.removeItem(AUTH_USER_KEY);
      }
    } catch { /* ignore quota/security errors */ }
  }, [user]);


  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState !== 'visible') return;

      const token = getAccessToken();


      if (!token && user) {
        setUser(null);
        window.localStorage.removeItem(AUTH_USER_KEY);
        return;
      }


      if (token && !user) {
        authApi.me()
          .then((profile) => setUser(mapProfileToAuthUser(profile)))
          .catch((err) => {
            if (err?.status === 401) {
              clearTokens();
              window.localStorage.removeItem(AUTH_USER_KEY);
            }
          });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [user]);

  const logout = async () => {
    try {
      await authApi.logout({ refreshToken: getRefreshToken() });
    } catch { /* always clear local state even if API call fails */ }
    finally {
      setUser(null);
      clearTokens();
      window.localStorage.removeItem(AUTH_USER_KEY);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);