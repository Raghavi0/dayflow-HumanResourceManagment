import React, { createContext, useState, useContext } from 'react';
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => { try { return JSON.parse(localStorage.getItem('dayflow_user')) || null; } catch { return null; } });
  const login = (data) => { setUser(data.user || data); localStorage.setItem('dayflow_token', data.token); localStorage.setItem('dayflow_user', JSON.stringify(data.user || data)); };
  const logout = () => { setUser(null); localStorage.removeItem('dayflow_token'); localStorage.removeItem('dayflow_user'); window.location.href = '/login'; };
  return <AuthContext.Provider value={{ user, login, logout, isHR: user?.role === 'HR' || user?.role === 'Admin' }}>{children}</AuthContext.Provider>;
};
export const useAuth = () => useContext(AuthContext);
