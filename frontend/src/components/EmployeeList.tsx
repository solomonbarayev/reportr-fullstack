import React from 'react';
import Loader from './Loader';
import EmployeeListItem from './EmployeeListItem';
import { useEmployees } from '../contexts/EmployeesContext';

const EmployeeList: React.FC = () => {
  const { employees, isEmployeesLoading } = useEmployees();

  if (isEmployeesLoading) {
    return <Loader />;
  }

  return (
    <section className="employees">
      <h1 className="employees__title">Employee List</h1>
      <ul className="employees__list">
        {employees.map((employee) => (
          <EmployeeListItem key={employee._id} employee={employee} />
        ))}
      </ul>
    </section>
  );
};

export default EmployeeList;
