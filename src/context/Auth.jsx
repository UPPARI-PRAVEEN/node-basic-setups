import { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext(); // Call createContext as a function

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: ''
  });

  useEffect(() => {
    const data = localStorage.getItem("data");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }
  }, [auth]); // Removed 'auth' from the dependency array to avoid an infinite loop

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
