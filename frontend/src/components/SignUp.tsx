import React, { useState } from 'react';
import { IRegisterData } from '../../src/interfaces/AuthData';
import EmployeeCheckboxes from './EmployeeCheckboxes';
import { useAuth } from '../contexts/AuthContext';
import { useFormValidity } from '../contexts/FormVallidityContext';
import AuthForm from './AuthForm';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  position: '',
  picture: '',
  isManager: false,
  mySubordinates: [],
};

const SignUp = () => {
  const [userData, setUserData] = useState<IRegisterData>(
    initialState as IRegisterData
  );

  const validityContext = useFormValidity();

  const authContext = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    validityContext!.validateInput(e);
  };

  const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, isManager: e.target.checked });
  };

  const handleEmployeeCheckboxes = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setUserData({
        ...userData,
        mySubordinates: [...userData.mySubordinates, e.target.id],
      });
    } else {
      setUserData({
        ...userData,
        mySubordinates: userData.mySubordinates.filter(
          (id) => id !== e.target.id
        ),
      });
    }
  };

  const checkIfEmployeeChecked = (id: string) => {
    return userData.mySubordinates?.includes(id);
  };

  return (
    <AuthForm
      name="signup"
      title="Sign up"
      userData={userData}
      handleChange={handleChange}>
      <div className="auth__input-container">
        <label htmlFor="name" className="auth__label">
          First Name
        </label>
        <input
          className="auth__input"
          type="text"
          name="firstName"
          id="firstName"
          onChange={handleChange}
          value={userData.firstName}
          placeholder="Enter your first name"
        />
        {/* span for error message */}
        {validityContext!.errors.firstName && (
          <span className="auth__error">
            {validityContext!.errors.firstName}
          </span>
        )}
      </div>
      <div className="auth__input-container">
        <label htmlFor="name" className="auth__label">
          Last Name
        </label>
        <input
          className="auth__input"
          type="text"
          name="lastName"
          id="lastName"
          onChange={handleChange}
          value={userData.lastName}
          placeholder="Enter your last name"
        />
        {/* span for error message */}
        {validityContext!.errors.lastName && (
          <span className="auth__error">
            {validityContext!.errors.lastName}
          </span>
        )}
      </div>
      <div className="auth__input-container">
        <label htmlFor="picture" className="auth__label">
          Picture
        </label>
        <input
          className="auth__input"
          type="text"
          name="picture"
          id="picture"
          onChange={handleChange}
          value={userData.picture}
          placeholder="Enter your picture url"
        />
        {/* span for error message */}
        {validityContext!.errors.picture && (
          <span className="auth__error">{validityContext!.errors.picture}</span>
        )}
      </div>
      <div className="auth__input-container">
        <label htmlFor="position" className="auth__label">
          Position
        </label>
        <input
          className="auth__input"
          type="text"
          name="position"
          id="position"
          onChange={handleChange}
          value={userData.position}
          placeholder="Enter your position"
        />
        {/* span for error message */}
        {validityContext!.errors.position && (
          <span className="auth__error">
            {validityContext!.errors.position}
          </span>
        )}
      </div>
      <div className="auth__checkbox">
        <label htmlFor="isManager" className="auth__label">
          Are you a manager?
        </label>
        <div className="auth__checkbox-container">
          <input
            type="checkbox"
            name="isManager"
            id="isManager"
            onChange={handleCheckBoxChange}
            checked={userData.isManager}
          />
          <span className="auth__check-text">Yes</span>
        </div>
      </div>

      {userData.isManager && (
        <div className="auth__subordinates">
          <label htmlFor="subordinates">
            Who are your employees?{' '}
            <div className="auth__subordinates-notice">
              (employees who already have a manager cannot be selected)
            </div>
          </label>
          <EmployeeCheckboxes
            handleEmployeeCheckboxes={handleEmployeeCheckboxes}
            checkIfEmployeeChecked={checkIfEmployeeChecked}
          />
        </div>
      )}
    </AuthForm>
  );
};

export default SignUp;
