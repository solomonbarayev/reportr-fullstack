import React from 'react';
import { useEffect } from 'react';

interface Props {
  isOpen: boolean;
  name: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Popup = ({ isOpen, name, onClose, children }: Props) => {
  // `useEffect` for the `Escape` listener and the `click` listener
  useEffect(() => {
    if (!isOpen) return;

    function handleEscClose(evt: KeyboardEvent) {
      if (evt.key === 'Escape') {
        onClose();
      }
    }

    function handleOverlayClickClose(this: Document, evt: MouseEvent) {
      const { target } = evt;

      if (target instanceof HTMLElement) {
        if (target.classList.contains('popup')) {
          onClose();
        }
      }
    }

    document.addEventListener('keydown', handleEscClose);
    document.addEventListener('click', handleOverlayClickClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
      document.removeEventListener('click', handleOverlayClickClose);
    };
  }, [isOpen, onClose]);

  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''} popup_type_${name}`}>
      <div className={`popup__container popup__container_type_${name}`}>
        {children}
        <button
          className={`popup__close-button ${`popup__close-button_type_${name}`}`}
          type="button"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default Popup;
