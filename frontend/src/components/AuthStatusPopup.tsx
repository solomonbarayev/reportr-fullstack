import React, { useEffect } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { usePopups } from '../contexts/PopupsContext';
import Popup from './Popup';

const AuthStatusPopup = ({ type }: { type: string | null }) => {
  const popupsContext = usePopups();

  //Effect to close the popup after 3 seconds
  useEffect(() => {
    if (popupsContext!.isAuthStatusPopupOpen) {
      const timer = setTimeout(() => {
        popupsContext?.closeAllPopups();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [popupsContext!.isAuthStatusPopupOpen]);

  return (
    <Popup
      isOpen={popupsContext!.isAuthStatusPopupOpen}
      name="authtooltip"
      onClose={popupsContext!.closeAllPopups}>
      {type === 'success' ? (
        <AiOutlineCheckCircle className="authtooltip__img" />
      ) : (
        <AiOutlineCloseCircle className="authtooltip__img" />
      )}
      <h2 className="authtooltip__title">
        {type === 'success'
          ? 'Success! You have been registered.'
          : 'Oops! Something went wrong. Please  try again.'}
      </h2>
    </Popup>
  );
};

export default AuthStatusPopup;
