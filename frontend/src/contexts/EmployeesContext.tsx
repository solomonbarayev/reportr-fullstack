import React, { createContext, useContext, useState, useEffect } from 'react';
import { IEmployee } from '../interfaces/EmployeeData';
import api from '../utils/api';
import { useAuth } from './AuthContext';

interface IContextState {
  employees: IEmployee[];
  setEmployees: React.Dispatch<React.SetStateAction<IEmployee[]>>;
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  isEmployeesLoading: boolean;
}

const EmployeesContext = createContext({} as IContextState);

export const EmployeesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [isEmployeesLoading, setIsEmployeesLoading] = useState<boolean>(true);

  const authContext = useAuth();

  useEffect(() => {
    api
      .getAllEmployees()
      .then((res) => {
        setEmployees(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsEmployeesLoading(false);
      });
  }, [authContext!.isLoggedIn]);

  return (
    <EmployeesContext.Provider
      value={{
        employees,
        setEmployees,
        loggedIn,
        setLoggedIn,
        isEmployeesLoading,
      }}>
      {children}
    </EmployeesContext.Provider>
  );
};

export default EmployeesProvider;

export const useEmployees = () => {
  const context = useContext(EmployeesContext);
  return context;
};
