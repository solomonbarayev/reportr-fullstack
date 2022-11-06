import React from 'react';
import { useFormValidity } from '../contexts/FormVallidityContext';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { IRegisterData } from '../interfaces/AuthData';
import { ILoginData } from '../interfaces/AuthData';

interface Props {
  name: string;
  children?: React.ReactNode;
  userData: ILoginData | IRegisterData;
  title: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AuthForm = ({
  children,
  name,
  userData,
  title,
  handleChange,
}: // handleSubmit,
Props) => {
  const authContext = useAuth();
  const validityContext = useFormValidity();

  const checkFormValidity = () => {
    if (
      //make sure all fields are filled
      Object.values(userData).every((value) => value !== '') &&
      //make sure all errors are empty
      Object.values(validityContext!.errors).every((value) => value === '')
    ) {
      validityContext!.setIsFormValid(true);
    } else {
      validityContext!.setIsFormValid(false);
    }
  };

  const handleAuthSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name === 'signin') {
      authContext!.handleSignIn(userData.email, userData.password);
    } else {
      authContext!.handleSignUp(userData as IRegisterData);
    }
  };

  React.useEffect(() => {
    checkFormValidity();
  }, [userData]);

  return (
    <section className={`auth auth_type_${name}`}>
      <h2 className={`auth__title auth__title_type_${name}`}>{title}</h2>
      <form
        className={`auth__form auth__form_type_${name}`}
        onSubmit={handleAuthSubmit}>
        <div
          className={`auth__input-container auth__input-container_type_${name}`}>
          <label
            htmlFor="email"
            className={`auth__label auth__label_type_${name}`}>
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className={`auth__input auth__input_type_${name}`}
            placeholder="Enter your email"
            onChange={handleChange}
            value={userData.email}
          />
          {validityContext!.errors.email && (
            <span className={`auth__error auth__error_type_${name}`}>
              {validityContext!.errors.email}
            </span>
          )}
        </div>
        <div
          className={`auth__input-container auth__input-container_type_${name}`}>
          <label
            htmlFor="password"
            className={`auth__label auth__label_type_${name}`}>
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className={`auth__input auth__input_type_${name}`}
            placeholder="Enter your password"
            onChange={handleChange}
            value={userData.password}
          />
          {validityContext!.errors.password && (
            <span className={`auth__error auth__error_type_${name}`}>
              {validityContext!.errors.password}
            </span>
          )}
        </div>

        {children}

        <button
          disabled={!validityContext!.isFormValid}
          type="submit"
          className={`auth__btn auth__btn_type_${name} ${
            !validityContext!.isFormValid && 'auth__btn_disabled'
          }`}>
          {title}
        </button>
      </form>
      <Link
        to={`/${name === 'signin' ? 'signup' : 'signin'}`}
        className={`auth__link auth__link_type_${name}`}>
        {name === 'signin' ? 'Or Register' : 'Already have an account? Sign In'}
      </Link>
    </section>
  );
};

export default AuthForm;
