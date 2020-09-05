import React from 'react';

import logoImg from '../../assets/images/logo.svg';
import heroImg from '../../assets/images/hero.svg';
import mapPinIcon from '../../assets/images/icons/map-pin.svg';
import plusCircleIcon from '../../assets/images/icons/plus-circle.svg';

import './styles.css';

function Landing() {
  return (
    <div id='page-landing'>
      <header>
        <img src={logoImg} alt='Urban Cuisines | Logo' />
        <h1>
          Urban <span className='breakline'></span>Cuisines
        </h1>
      </header>
      <main>
        <img src={heroImg} alt='Hero' />
        <div className='actions'>
          <div>
            <h3>
              Find restaurants <span className='breakline'></span>next to you!
            </h3>
            <a href='/'>
              <img src={mapPinIcon} alt='Find Restaurants Icon' />
              Find Restaurants
            </a>
          </div>
          <div>
            <h3>
              Or register a new <span className='breakline'></span>restaurant!
            </h3>
            <a href='/'>
              <img src={plusCircleIcon} alt='Find Restaurants Icon' />
              Register new restaurant
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Landing;
