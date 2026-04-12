import { useContext, createContext, useEffect, useState } from 'react';
import { authApi, configureHttpClientHandlers, clearTokens, getRefreshToken } from '../API/index.js';

const AuthContext = createContext();
const AUTH_USER_KEY = 'authUser';

const readStoredAuthUser = () => {
  try {
    const raw = window.localStorage.getItem(AUTH_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => readStoredAuthUser());

  const logout = async () => {
    try {
      await authApi.logout({ refreshToken: getRefreshToken() });
    } catch {
      // Ignore logout API failures and still clear local auth state.
    } finally {
      setUser(null);
      clearTokens();
      window.localStorage.removeItem(AUTH_USER_KEY);
    }
  };

  useEffect(() => {
    configureHttpClientHandlers({
      onUnauthorized: () => {
        logout();
        window.location.href = '/login';
      },
    });
  }, []);

  useEffect(() => {
    try {
      if (user) {
        window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
      } else {
        window.localStorage.removeItem(AUTH_USER_KEY);
      }
    } catch {
      // ignore
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);