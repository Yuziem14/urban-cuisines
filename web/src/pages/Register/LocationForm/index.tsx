import React, { useState, useEffect, ChangeEvent } from 'react';

import Map from '../../../components/Map';
import { useRegister } from '../../../contexts/register';

import './styles.css';

function LocationForm() {
  const { registerData, setRegisterData } = useRegister();
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    -25.441117,
    -49.270582,
  ]);

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  }

  function handleMapClick(latLng: { lat: number; lng: number }) {
    const { lat, lng } = latLng;

    setRegisterData({
      ...registerData,
      latitude: lat,
      longitude: lng,
    });

    setInitialPosition([lat, lng]);
  }

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        setInitialPosition([coords.latitude, coords.longitude]);
      });
    }
  }, []);

  return (
    <div id='location-form'>
      <h1>Restaurant Location</h1>
      <div className='input-block'>
        <label htmlFor='address'>Address</label>
        <input
          name='address'
          id='address'
          type='text'
          onChange={handleOnChange}
          value={registerData.address}
        />
      </div>
      <div className='input-block'>
        <label htmlFor='address'>Select a place in the map.</label>
        <Map
          onclick={({ latlng }) => handleMapClick(latlng)}
          zoom={15}
          center={initialPosition}
          initialPosition={initialPosition}
        >
          <></>
        </Map>
      </div>
    </div>
  );
}

export default LocationForm;
