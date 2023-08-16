import React, { useState } from "react";

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("jwtToken"));

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return React.useContext(AuthContext);
}
