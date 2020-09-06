import React from 'react';
import { Link } from 'react-router-dom';

import arrowIcon from '../../assets/images/icons/arrow.svg';
import logoImg from '../../assets/images/logo.svg';

import './styles.css';

interface TopBarProps {
  title: string;
}

const TopBar: React.FC<TopBarProps> = ({ title }) => {
  return (
    <nav id='top-bar'>
      <div className='wrapper'>
        <Link to='/'>
          <img src={arrowIcon} alt='Go Back' />
        </Link>
        <p>{title}</p>
        <Link to='/'>
          <img src={logoImg} alt='Urban Cuisines | Logo' />
        </Link>
      </div>
    </nav>
  );
};

export default TopBar;
