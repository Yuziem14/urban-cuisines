import React from 'react';

import './styles.css';
interface ModalProps {
  id?: string;
  isVisible: boolean;
}

const Modal: React.FC<ModalProps> = ({ children, id, isVisible = false }) => {
  return (
    <div id={id} className={`modal ${isVisible ? '' : 'hidden'}`}>
      {children}
    </div>
  );
};

export default Modal;
