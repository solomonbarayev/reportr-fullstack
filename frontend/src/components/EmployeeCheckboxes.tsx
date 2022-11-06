import React from 'react';
import { useEmployees } from '../contexts/EmployeesContext';
import EmployeeOption from './EmployeeOption';

interface Props {
  handleEmployeeCheckboxes: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checkIfEmployeeChecked: (id: string) => boolean;
}

const EmployeeCheckboxes = ({
  handleEmployeeCheckboxes,
  checkIfEmployeeChecked,
}: Props) => {
  const { employees } = useEmployees();

  return (
    <>
      <ul className="auth__employees-list">
        {employees.map((employee) => (
          <EmployeeOption
            employee={employee}
            key={employee._id}
            handleEmployeeCheckboxes={handleEmployeeCheckboxes}
            checkIfEmployeeChecked={checkIfEmployeeChecked}
          />
        ))}
      </ul>
    </>
  );
};

export default EmployeeCheckboxes;
