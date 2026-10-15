// ============================================
// AuthContext : utilisateur connecté global
// ============================================

import { createContext, useContext, useState } from 'react';
import authService from '../services/authService';

// 1. Créer le contexte
const AuthContext = createContext(null);

// ============================================
// AuthProvider : fournit les données à toute l'app
// ============================================

export function AuthProvider({ children }) {
  // Initialiser directement depuis le localStorage (pas de useEffect)
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('token') || null;
  });

  // 2. Connexion
  const login = async (email, password) => {
    const response = await authService.login({ email, password });
    const { token: newToken, user: newUser } = response.data;

    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));

    setToken(newToken);
    setUser(newUser);

    return response;
  };

  // 3. Inscription
  const register = async (data) => {
    const response = await authService.register(data);
    const { token: newToken, user: newUser } = response.data;

    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));

    setToken(newToken);
    setUser(newUser);

    return response;
  };

  // 4. Déconnexion
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  // 5. Valeur partagée à toute l'application
  const value = {
    user,
    token,
    isAuthenticated: !!token,
    loading: false,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ============================================
// Hook personnalisé pour utiliser le contexte
// ============================================

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth doit être utilisé à l'intérieur de AuthProvider");
  }

  return context;
}