import React, { useState, useEffect, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import { Map, Marker, RestaurantIcon } from '../../components/Map';
import RestaurantPopup from '../../components/RestaurantPopup';
import TopBar from '../../components/TopBar';
import TagItem from '../../components/Tag';
import Modal from '../../components/Modal';

import tagIcon from '../../assets/images/icons/tag.svg';
import paperClipIcon from '../../assets/images/icons/paperclip.svg';
import searchIcon from '../../assets/images/icons/search.svg';
import cutleryIcon from '../../assets/images/icons/cutlery.svg';
import { ReactComponent as CheckCircle } from '../../assets/images/icons/check-circle.svg';

import { Tag, Restaurant } from '../../interfaces';
import api from '../../services/api';

import './styles.css';

function Find() {
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    -25.441117,
    -49.270582,
  ]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  function toggleModal() {
    setShowModal(!showModal);
  }

  function handleSelectTag(selectedTag: Tag) {
    const index = selectedTags.findIndex(tag => tag.id === selectedTag.id);
    const selectedCopy = [...selectedTags];
    if (index !== -1) {
      selectedCopy.splice(index, 1);
    } else {
      selectedCopy.push(selectedTag);
    }

    setSelectedTags(selectedCopy);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const tagSlugs = selectedTags.map(tag => tag.slug);
    api
      .get('restaurants', {
        params: {
          tags: tagSlugs.join(','),
        },
      })
      .then(({ data }) => {
        setRestaurants(data);
      });
  }

  function handleGoToRestaurant(id: number) {
    return history.push(`/restaurants/${id}`);
  }

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        setInitialPosition([coords.latitude, coords.longitude]);
      });
    }
  }, []);

  useEffect(() => {
    api.get('tags').then(({ data }) => {
      setTags(data);
    });
  }, []);

  return (
    <div id='page-find'>
      <TopBar title='Local Restaurants' />
      <header>
        <div className='wrapper'>
          <h1>
            Improve your search <span className='breakline'></span>using our
            tags
            <img src={tagIcon} alt='Tags' />
          </h1>
          <form onSubmit={handleSubmit}>
            <button type='button' onClick={toggleModal}>
              Select tags
              <img src={paperClipIcon} alt='Paperclip' />
            </button>
            <button type='submit'>
              <img src={searchIcon} alt='Search' />
            </button>
          </form>
        </div>
      </header>
      <main>
        <section className='tags wrapper'>
          <p>Tags:</p>
          <div>
            {selectedTags &&
              selectedTags.map((tag: Tag) => (
                <TagItem
                  key={tag.id}
                  name={tag.name}
                  onSelect={e => {
                    handleSelectTag(tag);
                  }}
                />
              ))}
          </div>
        </section>
        <section className='restaurants wrapper'>
          <div className='results'>
            <img src={cutleryIcon} alt='Restaurant' />
            <p>
              {restaurants.length} restaurantes{' '}
              <span className='breakline'></span>encontrados.
            </p>
          </div>
          <Map
            initialPosition={initialPosition}
            center={initialPosition}
            zoom={16}
          >
            {restaurants &&
              restaurants.map(({ id, name, logo_url, latitude, longitude }) => (
                <Marker
                  key={id}
                  icon={RestaurantIcon}
                  position={[latitude, longitude]}
                >
                  <RestaurantPopup
                    onClick={() => handleGoToRestaurant(id)}
                    name={name}
                    logo_url={logo_url}
                  >
                    <></>
                  </RestaurantPopup>
                </Marker>
              ))}
          </Map>
        </section>
      </main>
      <Modal id='tags-modal' isVisible={showModal}>
        <div className='wrapper'>
          <h1>All Tags</h1>
          <section>
            {tags &&
              tags.map((tag: Tag) => (
                <TagItem
                  key={tag.id}
                  name={tag.name}
                  isSelected={selectedTags.some(
                    selectedTag => selectedTag.id === tag.id
                  )}
                  onSelect={e => {
                    handleSelectTag(tag);
                  }}
                />
              ))}
          </section>
          <button className='close-modal' onClick={toggleModal} type='button'>
            Done
            <CheckCircle />
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Find;
