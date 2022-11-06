import React, { useState } from 'react';
import { useFormValidity } from '../contexts/FormVallidityContext';
import AuthForm from './AuthForm';

const SignIn = () => {
  const validityContext = useFormValidity();

  const [userData, setUserData] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    validityContext!.validateInput(e);
  };

  return (
    <AuthForm
      name="signin"
      title="Sign In"
      handleChange={handleChange}
      userData={userData}
    />
  );
};

export default SignIn;
