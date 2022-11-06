import React, { createContext, useContext, useState, useEffect } from 'react';

interface IAuthContextState {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

type TokenContextProviderProps = {
  children: React.ReactNode;
};

const TokenContext = createContext<IAuthContextState | null>(null);

export const TokenProvider = ({ children }: TokenContextProviderProps) => {
  const [token, setToken] = useState(localStorage.getItem('jwt'));

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export default TokenProvider;

export const useToken = () => {
  const context = useContext(TokenContext);
  return context;
};
