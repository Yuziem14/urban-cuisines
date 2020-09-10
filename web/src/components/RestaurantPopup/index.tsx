import React, { MouseEventHandler } from 'react';
import { Popup, PopupProps } from 'react-leaflet';

import './styles.css';

interface RestaurantPopupProps extends PopupProps {
  name: string;
  logo_url: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const RestaurantPopup: React.FC<RestaurantPopupProps> = ({
  name,
  onClick = () => {},
  logo_url,
  children,
  ...rest
}) => {
  return (
    <Popup className='restaurant-map-popup' {...rest}>
      <div onClick={onClick} className='restaurant-popup'>
        <p>{name}</p>
        <img src={logo_url} alt={name} />
      </div>
    </Popup>
  );
};

export default RestaurantPopup;
