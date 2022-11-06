import React from 'react';
import Popup from './Popup';

interface Props {
  isOpen: boolean;
  name: string;
  onClose: () => void;
  // onSubmit: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (evt: React.FormEvent<HTMLFormElement>) => void;
  submitButtonText: string;
  children: React.ReactNode;
  title: string;
}

const PopupWithForm = ({
  isOpen,
  name,
  onClose,
  onSubmit,
  title,
  submitButtonText,
  children,
}: Props) => {
  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <h2 className="popup__title">{title}</h2>
      <form
        action="submit"
        className="form popup__form"
        name={name}
        onSubmit={onSubmit}>
        {children}
        <fieldset className="form__fieldset">
          <button className="form__submit-button" type="submit">
            {submitButtonText}
          </button>
        </fieldset>
      </form>
    </Popup>
  );
};

export default PopupWithForm;
