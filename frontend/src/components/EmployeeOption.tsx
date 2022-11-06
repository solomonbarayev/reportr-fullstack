import React from 'react';
import { IEmployee } from '../interfaces/EmployeeData';

interface Props {
  handleEmployeeCheckboxes: (e: React.ChangeEvent<HTMLInputElement>) => void;
  employee: IEmployee;
  checkIfEmployeeChecked: (id: string) => boolean;
}

const EmployeeOption = ({
  employee,
  handleEmployeeCheckboxes,
  checkIfEmployeeChecked,
}: Props) => {
  const [isDisabled, setIsDisabled] = React.useState(false);

  React.useEffect(() => {
    if (employee.managerId) {
      setIsDisabled(true);
    }
  }, []);

  return (
    <li
      className={`auth__employee-list-item ${
        employee.managerId ? 'auth__employee-list-item_deactivated' : null
      }`}>
      <input
        type="checkbox"
        disabled={isDisabled}
        id={employee._id}
        name={employee._id}
        onChange={handleEmployeeCheckboxes}
        checked={checkIfEmployeeChecked(employee._id)}
      />
      <label
        htmlFor={
          employee._id
        }>{`${employee.firstName} ${employee.lastName}`}</label>
    </li>
  );
};

export default EmployeeOption;
