import React, { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';

import Modal from '../../../components/Modal';
import { ReactComponent as CheckCircleIcon } from '../../../assets/images/icons/check-circle.svg';

import './styles.css';

interface RegisteredProps {
  goTo: string;
  timeOut: number;
}

const Registered: React.FC<RegisteredProps> = ({
  goTo = '/',
  timeOut = 3000,
}) => {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push(goTo);
    }, timeOut);
  }, []);

  return (
    <Modal id='page-registered' isVisible>
      <CheckCircleIcon />
      <h2>
        Restaurant registred <span className='breakline'></span> successfully!
      </h2>
      <Link to={goTo}>Access</Link>
    </Modal>
  );
};

export default Registered;
