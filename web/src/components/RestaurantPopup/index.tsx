import React from 'react';
import { Popup, PopupProps } from 'react-leaflet';

import './styles.css';

interface RestaurantPopupProps extends PopupProps {
  name: string;
  logo_url: string;
}

const RestaurantPopup: React.FC<RestaurantPopupProps> = ({
  name,
  logo_url,
  children,
  ...rest
}) => {
  return (
    <Popup className='restaurant-map-popup' {...rest}>
      <div className='restaurant-popup'>
        <p>{name}</p>
        <img src={logo_url} alt={name} />
      </div>
    </Popup>
  );
};

export default RestaurantPopup;
