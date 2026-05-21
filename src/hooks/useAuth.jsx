import { useContext, createContext, useEffect, useRef, useState } from 'react';
import {
  authApi,
  configureHttpClientHandlers,
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setTokens,
  httpClient,
} from '../API/index.js';
import { API_PATHS } from '../Services/constants/apiPaths.js';

const AuthContext = createContext();
const AUTH_USER_KEY = 'authUser';

/* ── helpers ── */
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

const isSameAuthenticatedUser = (currentUser, nextUser) => {
  if (!currentUser || !nextUser) return false;

  if (currentUser.id != null && nextUser.id != null) {
    return String(currentUser.id) === String(nextUser.id);
  }

  if (currentUser.username && nextUser.username) {
    return String(currentUser.username).trim().toLowerCase() === String(nextUser.username).trim().toLowerCase();
  }

  return false;
};

// Bypasses httpClient's 401 interception — WE handle errors, not httpClient
const fetchMe = () => httpClient.get(API_PATHS.users.me, { retryOn401: false });

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
  } catch (err) {
    // Only wipe tokens on explicit rejection, not network errors or 500s
    if (err?.status === 401 || err?.status === 403) {
      clearTokens();
    }
    return false;
  }
};

/* ── provider ── */
export const AuthProvider = ({ children }) => {
  const [user, setUser]           = useState(() => readStoredAuthUser());
  const [isLoading, setIsLoading] = useState(true);

  const onUnauthorizedRef = useRef(null);
  onUnauthorizedRef.current = async () => {
    // Before redirecting, try refresh — another concurrent request may have
    // already expired the token but the refresh token is still valid
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      const refreshed = await refreshAccessToken();
      if (refreshed) return; // session recovered — do NOT redirect
    }
    setUser(null);
    clearTokens();
    window.localStorage.removeItem(AUTH_USER_KEY);
    window.location.href = '/login';
  };

  // Wire up httpClient handlers once on mount
  useEffect(() => {
    configureHttpClientHandlers({
      refresh:        refreshAccessToken,
      onUnauthorized: () => onUnauthorizedRef.current(),
    });
  }, []);

  // Cold load rehydration — runs ONCE on mount only
  useEffect(() => {
    const storedUser = readStoredAuthUser();
    const token = getAccessToken();

    // Already have user in state and a token — nothing to do
    if (storedUser && token) {
      setIsLoading(false);
      return;
    }

    // No token at all — not logged in
    if (!token) {
      setIsLoading(false);
      return;
    }

    // Have a token but no user in state — rehydrate from backend
    let active = true;
    (async () => {
      try {
        const profile = await fetchMe();
        if (active) setUser(mapProfileToAuthUser(profile));
      } catch (err) {
        if (!active) return;
        if (err?.status === 401) {
          // Token expired on cold load — try refresh before giving up
          const refreshed = await refreshAccessToken();
          if (refreshed) {
            try {
              const profile = await fetchMe();
              if (active) setUser(mapProfileToAuthUser(profile));
            } catch {
              if (active) {
                clearTokens();
                window.localStorage.removeItem(AUTH_USER_KEY);
                setUser(null);
              }
            }
          } else {
            if (active) {
              clearTokens();
              window.localStorage.removeItem(AUTH_USER_KEY);
              setUser(null);
            }
          }
        }
        // Non-401 (500, network error) — leave user alone, don't logout
      } finally {
        if (active) setIsLoading(false); // always unblock PrivateRoute
      }
    })();

    return () => { active = false; };
  }, []); // mount only

  // Persist user to localStorage whenever it changes
  useEffect(() => {
    try {
      if (user) window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
      else window.localStorage.removeItem(AUTH_USER_KEY);
    } catch { /* ignore quota/security errors */ }
  }, [user]);


  const mergeUser = (profile, existingUser) => {
    const next = mapProfileToAuthUser(profile);

    if (!existingUser) return next;
    
    if (!isSameAuthenticatedUser(existingUser, next)) {
      console.warn(
        '[useAuth] Profile fetch user mismatch on tab focus.',
        { logged: { id: existingUser.id, username: existingUser.username }, fetched: { id: next.id, username: next.username } }
      );
      return existingUser;
    }

    return {
      ...existingUser,
      ...next,
      role: existingUser.role,
    };
  };
  // Tab focus — silently revalidate session when user returns to tab
  // Uses fetchMe() with retryOn401:false so httpClient doesn't intercept
  // the 401 and redirect before we get a chance to refresh
  const visibilityHandlerRef = useRef(null);
  
  useEffect(() => {
    visibilityHandlerRef.current = async () => {
      if (document.visibilityState !== 'visible') return;
      const currentUser = readStoredAuthUser(); // Read fresh from storage each time
      if (!currentUser) return;

      const accessToken  = getAccessToken();
      const refreshToken = getRefreshToken();

      if (!accessToken && !refreshToken) {
        setUser(null);
        clearTokens();
        window.localStorage.removeItem(AUTH_USER_KEY);
        return;
      }

      if (accessToken) {
        try {
          const profile = await fetchMe();
          const nextUser = mapProfileToAuthUser(profile);
          
          if (isSameAuthenticatedUser(currentUser, nextUser)) {
            setUser(prev => mergeUser(profile, prev ?? currentUser));
          } else {
            console.warn('[useAuth] Tab refocus: Backend returned different user, preserving session.', {
              logged: { id: currentUser.id, username: currentUser.username },
              fetched: { id: nextUser.id, username: nextUser.username },
            });
          }
        } catch (err) {
          if (err?.status !== 401) {
            console.log('[useAuth] Tab refocus error (non-401):', err?.message);
            return;
          }
          if (!refreshToken) {
            setUser(null);
            clearTokens();
            window.localStorage.removeItem(AUTH_USER_KEY);
            return;
          }
          const refreshed = await refreshAccessToken();
          if (refreshed) {
            try {
              const profile = await fetchMe();
              const nextUser = mapProfileToAuthUser(profile);
              
              if (isSameAuthenticatedUser(currentUser, nextUser)) {
                setUser(prev => mergeUser(profile, prev ?? currentUser));
              } else {
                console.warn('[useAuth] After token refresh: Backend returned different user, preserving session.', {
                  logged: { id: currentUser.id, username: currentUser.username },
                  fetched: { id: nextUser.id, username: nextUser.username },
                });
              }
            } catch {
              setUser(null);
              clearTokens();
              window.localStorage.removeItem(AUTH_USER_KEY);
            }
          } else {
            setUser(null);
            clearTokens();
            window.localStorage.removeItem(AUTH_USER_KEY);
          }
        }
        return;
      }

      const refreshed = await refreshAccessToken();
      if (refreshed) {
        try {
          const profile = await fetchMe();
          const nextUser = mapProfileToAuthUser(profile);
          
          if (isSameAuthenticatedUser(currentUser, nextUser)) {
            setUser(prev => mergeUser(profile, prev ?? currentUser));
          } else {
            console.warn('[useAuth] No token, after refresh: Backend returned different user, preserving session.', {
              logged: { id: currentUser.id, username: currentUser.username },
              fetched: { id: nextUser.id, username: nextUser.username },
            });
          }
        } catch {
          setUser(null);
          clearTokens();
          window.localStorage.removeItem(AUTH_USER_KEY);
        }
      } else {
        setUser(null);
        clearTokens();
        window.localStorage.removeItem(AUTH_USER_KEY);
      }
    };
  }, []);

  useEffect(() => {
    document.addEventListener('visibilitychange', visibilityHandlerRef.current);
    return () => document.removeEventListener('visibilitychange', visibilityHandlerRef.current);
  }, []);
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
    <AuthContext.Provider value={{ user, setUser, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);