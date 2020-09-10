import React, { useState, MouseEvent } from 'react';
import { Redirect, useHistory } from 'react-router-dom';

import TopBar from '../../components/TopBar';
import BasicInfoForm from './BasicInfoForm';
import LocationForm from './LocationForm';
import TagForm from './TagForm';
import Registered from './Registered';
import { RegisterProvider, useRegister } from '../../contexts/register';

import { ReactComponent as Arrow } from '../../assets/images/icons/arrow-small.svg';

import api from '../../services/api';

import './styles.css';

function Register() {
  const [registerId, setRegisterId] = useState<number | null>(null);
  const {
    currentStep,
    setCurrentStep,
    stepPositions,
    FIRST_STEP,
    LAST_STEP,
    registerData,
  } = useRegister();
  const history = useHistory();

  function getStepComponent(step: number): React.ReactNode {
    if (step < FIRST_STEP || step > LAST_STEP) return <Redirect to='/' />;

    const stepComponents = [BasicInfoForm, LocationForm, TagForm];
    const StepComponent = stepComponents[step];
    return <StepComponent />;
  }

  function previous() {
    if (currentStep < FIRST_STEP) {
      return history.push('/');
    }

    setCurrentStep(currentStep - 1);
  }

  function next(e: MouseEvent<HTMLButtonElement>) {
    if (currentStep > LAST_STEP) {
      return history.push('/');
    }
    setCurrentStep(currentStep + 1);
  }

  function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const formData = new FormData();
    const customTags = registerData.customTags.join(',');
    const tags = registerData.tags.map(tag => tag.slug).join(',');

    formData.append('name', registerData.name);
    formData.append('description', registerData.description);
    formData.append('phone_number', registerData.phone_number);
    formData.append('address', registerData.address);
    formData.append('latitude', registerData.latitude.toString());
    formData.append('longitude', registerData.longitude.toString());
    formData.append('tags', tags);
    formData.append('custom_tags', customTags);
    formData.append('logo', registerData.logo || '');

    api
      .post('restaurants', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(({ data }) => {
        setRegisterId(data.id);
      });
  }

  if (registerId) {
    return <Registered goTo={`/restaurants/${registerId}`} timeOut={3000} />;
  }

  return (
    <div id='page-register'>
      <TopBar title='Register Restaurant' />
      <header>
        <div className='wrapper'>
          <h1>
            Help others to find a <span className='breakline'></span>
            restaurant.
          </h1>
        </div>
      </header>
      <main>
        <form id='register-form' className='wrapper'>
          {getStepComponent(currentStep)}
        </form>
      </main>
      <footer>
        <div className='wrapper'>
          <button
            type='button'
            className='form-control prev'
            onClick={previous}
          >
            <Arrow />
            <span>{currentStep === FIRST_STEP ? 'Cancel' : 'Prev.'}</span>
          </button>
          <div className='form-status'>
            {stepPositions.map(value => (
              <div
                key={value}
                className={`step ${currentStep === value ? 'active' : ''}`}
              ></div>
            ))}
          </div>

          <button
            type='button'
            className='form-control next'
            onClick={e => {
              if (currentStep === LAST_STEP) {
                handleSubmit(e);
              } else {
                next(e);
              }
            }}
          >
            <span>{currentStep === LAST_STEP ? 'Save' : 'Next'}</span>
            <Arrow />
          </button>
        </div>
      </footer>
    </div>
  );
}

function RegisterWithContext() {
  return (
    <RegisterProvider>
      <Register />
    </RegisterProvider>
  );
}

export default RegisterWithContext;
