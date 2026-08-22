import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const token =
      localStorage.getItem("dayflow_token");

    if (!token) {
      setLoading(false);
      return;
    }

    api.me()
      .then((data) => {
        setUser(data.user);
      })
      .catch(() => {
        localStorage.removeItem("dayflow_token");
        localStorage.removeItem("dayflow_user");
      })
      .finally(() => {
        setLoading(false);
      });

  }, []);

  const login = async (email, password) => {

    const data =
      await api.login({
        email,
        password,
      });

    localStorage.setItem(
      "dayflow_token",
      data.token
    );

    localStorage.setItem(
      "dayflow_user",
      JSON.stringify(data.user)
    );

    setUser(data.user);

    return data.user;
  };

  const register = async (formData) => {
    return api.register(formData);
  };

  const logout = () => {

    localStorage.removeItem(
      "dayflow_token"
    );

    localStorage.removeItem(
      "dayflow_user"
    );

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
