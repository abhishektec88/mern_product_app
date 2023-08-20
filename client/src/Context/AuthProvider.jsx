import { createContext, useEffect, useState } from "react";


const AuthContext = createContext()

const AuthProvider =({children}) => {
    const [auth, setAuth] = useState('');

  useEffect(() => {
    const storedAuth = localStorage.getItem('token');
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
    }
  }, []);

  useEffect(() => {
    if (auth) {
      localStorage.setItem('token', JSON.stringify(auth));
    } else {
      localStorage.removeItem('token');
    }
  }, [auth]);

  const LoginAuth = (user) => {
    setAuth(user);
  };

  const logoutAuth = () => {
    setAuth('');
  };

    return (
        <AuthContext.Provider value={{auth, setAuth, LoginAuth, logoutAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthProvider, AuthContext}
