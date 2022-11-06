import { createContext, useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router';
import emailRegex from '../utils/emailRegex';
import urlRegex from '../utils/urlRegex';

interface IFormValidityContextState {
  isFormValid: boolean;
  setIsFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  validateInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    position: string;
    picture: string;
  };
}

type FormValidityContextProviderProps = {
  children: React.ReactNode;
};

const FormValidityContext = createContext<IFormValidityContextState | null>(
  null
);

export const FormValidityProvider = ({
  children,
}: FormValidityContextProviderProps) => {
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const [initialErrorState] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    position: '',
    picture: '',
  });

  const [errors, setErrors] = useState(initialErrorState);

  //reset errors on location change
  const location = useLocation();
  useEffect(() => {
    setErrors(initialErrorState);
  }, [location]);

  const validateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'email') {
      e.target.value === ''
        ? setErrors({ ...errors, email: 'Email is required' })
        : setErrors({ ...errors, email: '' });

      !emailRegex.test(e.target.value)
        ? setErrors({ ...errors, email: 'Email is invalid' })
        : setErrors({ ...errors, email: '' });
    }

    if (e.target.name === 'password') {
      e.target.value === ''
        ? setErrors({ ...errors, password: 'Password is required' })
        : setErrors({ ...errors, password: '' });

      e.target.value.length < 8
        ? setErrors({
            ...errors,
            password: 'Password must be at least 8 characters',
          })
        : setErrors({ ...errors, password: '' });
    }

    if (e.target.name === 'firstName') {
      e.target.value === ''
        ? setErrors({ ...errors, firstName: 'First Name is required' })
        : setErrors({ ...errors, firstName: '' });
    }

    if (e.target.name === 'lastName') {
      e.target.value === ''
        ? setErrors({ ...errors, lastName: 'Last Name is required' })
        : setErrors({ ...errors, lastName: '' });
    }

    if (e.target.name === 'position') {
      e.target.value === ''
        ? setErrors({ ...errors, position: 'Position is required' })
        : setErrors({ ...errors, position: '' });
    }

    if (e.target.name === 'picture') {
      e.target.value === ''
        ? setErrors({ ...errors, picture: 'Picture is required' })
        : setErrors({ ...errors, picture: '' });
      !urlRegex.test(e.target.value)
        ? setErrors({ ...errors, picture: 'URL is invalid' })
        : setErrors({ ...errors, picture: '' });
    }
  };

  return (
    <FormValidityContext.Provider
      value={{ isFormValid, setIsFormValid, validateInput, errors }}>
      {children}
    </FormValidityContext.Provider>
  );
};

export default FormValidityProvider;

export const useFormValidity = () => {
  const context = useContext(FormValidityContext);
  return context;
};
