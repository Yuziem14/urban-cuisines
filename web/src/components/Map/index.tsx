import React from 'react';
import {
  Map as LMap,
  MapProps as LMapProps,
  TileLayer,
  Marker,
} from 'react-leaflet';

import './styles.css';
import { MapPinIcon, RestaurantIcon } from './icons';

export { Marker };
export { MapPinIcon, RestaurantIcon };

interface MapProps extends LMapProps {
  initialPosition?: [number, number];
}

export const Map: React.FC<MapProps> = ({
  children,
  initialPosition,
  ...rest
}) => {
  return (
    <div id='map'>
      <LMap {...rest}>
        <TileLayer
          attribution={`&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors`}
          url='https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png'
        />
        {initialPosition && (
          <Marker position={initialPosition} icon={MapPinIcon} />
        )}
        {children}
      </LMap>
    </div>
  );
};

export default Map;
