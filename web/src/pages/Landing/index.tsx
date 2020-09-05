import React from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import heroImg from '../../assets/images/hero.svg';
import mapPinIcon from '../../assets/images/icons/map-pin.svg';
import plusCircleIcon from '../../assets/images/icons/plus-circle.svg';

import './styles.css';

function Landing() {
  return (
    <div id='page-landing'>
      <div className='wrapper'>
        <header>
          <img src={logoImg} alt='Urban Cuisines | Logo' />
          <h1>
            Urban <span className='breakline'></span>Cuisines
          </h1>
        </header>
      </div>
      <main>
        <div className='wrapper hero-image'>
          <img src={heroImg} alt='Hero' />
        </div>
        <div className='actions'>
          <div className='wrapper'>
            <div>
              <h3>
                Find restaurants <span className='breakline'></span>next to you!
              </h3>
              <Link to='/find'>
                <img src={mapPinIcon} alt='Find Restaurants Icon' />
                Find Restaurants
              </Link>
            </div>
            <div>
              <h3>
                Or register a new <span className='breakline'></span>restaurant!
              </h3>
              <Link to='/register'>
                <img src={plusCircleIcon} alt='Find Restaurants Icon' />
                Register new restaurant
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Landing;
