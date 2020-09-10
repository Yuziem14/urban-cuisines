import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import TopBar from '../../components/TopBar';
import Tag from '../../components/Tag';
import Map from '../../components/Map';
import Modal from '../../components/Modal';

import { Restaurant as IRestaurant } from '../../interfaces';
import api from '../../services/api';

import { ReactComponent as WhatsappIcon } from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

function Restaurant() {
  const { id } = useParams();
  const history = useHistory();
  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);

  function _serialize(data: IRestaurant) {
    const tags = data.tags?.map(tag => ({
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
    }));

    return { ...data, tags };
  }

  useEffect(() => {
    api
      .get(`restaurants/${id}`)
      .then(({ data }) => {
        setRestaurant(_serialize(data));
      })
      .catch(err => {
        history.push('/');
      });
  }, [history, id]);

  if (!restaurant) {
    return (
      <Modal id='restaurant-loading' isVisible>
        <h1>Loading...</h1>
      </Modal>
    );
  }

  return (
    <div id='restaurant'>
      <TopBar title={restaurant.name} />
      <header></header>
      <main>
        <div className='wrapper'>
          <div
            className='logo'
            style={{
              backgroundImage: `url(${restaurant.logo_url})`,
            }}
          ></div>
          <h1>{restaurant.name}</h1>
          <div className='tags'>
            {restaurant.tags &&
              restaurant.tags.map(tag => (
                <Tag key={tag.id} name={tag.name} onSelect={() => {}} />
              ))}
          </div>
          <p className='description'>{restaurant.description}</p>
          <div className='address'>
            <p>{restaurant.address}</p>
            <Map
              center={[restaurant.latitude, restaurant.longitude]}
              initialPosition={[restaurant.latitude, restaurant.longitude]}
              zoom={16}
            >
              <></>
            </Map>
          </div>
          <a
            href={`https://api.whatsapp.com/send?phone=${restaurant.phone_number}`}
            target='_blank'
            rel='noopener noreferrer'
            className='whatsapp-button'
            type='button'
          >
            <WhatsappIcon />
            Get In Touch
          </a>
        </div>
      </main>
    </div>
  );
}

export default Restaurant;
