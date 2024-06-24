import { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

interface AuthContextType {
  auth: any; 
  setAuth: Dispatch<SetStateAction<any>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<any>({}); 

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
