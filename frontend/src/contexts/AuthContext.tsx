import React, { createContext, useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { IEmployee } from '../interfaces/EmployeeData';
import { IRegisterData } from '../interfaces/AuthData';
import auth from '../utils/auth';
import { usePopups } from './PopupsContext';
import { useToken } from './TokenContext';

interface IAuthContextState {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  userData: IEmployee;
  setUserData: React.Dispatch<React.SetStateAction<IEmployee>>;
  handleSignIn: (email: string, password: string) => void;
  handleSignUp: (data: IRegisterData) => void;
  handleSignOut: () => void;
  isCheckingToken: boolean;
  setIsCheckingToken: React.Dispatch<React.SetStateAction<boolean>>;
}

type AuthContextProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<IAuthContextState | null>(null);

export const AuthProvider = ({ children }: AuthContextProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [token, setToken] = useState(localStorage.getItem('jwt'));
  const [userData, setUserData] = useState<IEmployee>({} as IEmployee);
  const [isCheckingToken, setIsCheckingToken] = useState<boolean>(true);

  const history = useHistory();

  const popupsContext = usePopups();
  const tokenContext = useToken();

  const userAuth = new auth();

  useEffect(() => {
    if (tokenContext?.token) {
      userAuth
        .checkToken(tokenContext?.token)
        .then((res: IEmployee) => {
          if (res) {
            setIsLoggedIn(true);
            setUserData(res);
            history.push('/');
          }
        })
        .catch((err: any) => {
          console.log(err);
          history.push('/signin');
        })
        .finally(() => {
          setIsCheckingToken(false);
        });
    } else {
      setIsCheckingToken(false);
    }
  }, []);

  const handleSignIn = (email: string, password: string) => {
    setIsCheckingToken(true);
    userAuth
      .login(email, password)
      .then((res: any) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          tokenContext!.setToken(res.token);
          setIsLoggedIn(true);
          setUserData(res.user);
          history.push('/');
        }
      })
      .catch((err: any) => {
        console.log(err);
        popupsContext?.setAuthStatus('error');
        popupsContext?.setIsAuthStatusPopupOpen(true);
      })
      .finally(() => {
        setIsCheckingToken(false);
      });
  };

  const handleSignUp = (data: IRegisterData) => {
    userAuth
      .register(data)
      .then((res: any) => {
        if (res) {
          popupsContext!.setAuthStatus('success');
          history.push('/signin');
        } else {
          popupsContext!.setAuthStatus('error');
        }
      })
      .catch((err: any) => {
        console.log(err);
        popupsContext!.setAuthStatus('error');
      })
      .finally(() => {
        popupsContext!.setIsAuthStatusPopupOpen(true);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    setUserData({} as IEmployee);
    tokenContext!.setToken('');
    setIsLoggedIn(false);
    history.push('/signin');
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        handleSignIn,
        handleSignUp,
        handleSignOut,
        isCheckingToken,
        setIsCheckingToken,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
