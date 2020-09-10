import React, { useState, useEffect, createRef, ChangeEvent } from 'react';

import { useRegister } from '../../../contexts/register';

import { ReactComponent as CameraIcon } from '../../../assets/images/icons/camera.svg';

import './styles.css';

function BasicInfoForm() {
  const fileInputRef = createRef<HTMLInputElement>();
  const [previewStyle, setPreviewStyle] = useState({});
  const { registerData, setRegisterData } = useRegister();

  function computePreviewStyle(imageToPreview: File | null | undefined) {
    if (!imageToPreview) return {};
    const fileUrl = URL.createObjectURL(imageToPreview);

    return { backgroundImage: `url(${fileUrl})` };
  }

  function handleOpenFilesystem() {
    fileInputRef.current?.click();
  }

  function handleSelectFile(e: ChangeEvent<HTMLInputElement>) {
    const uploadedFile = e.target.files?.[0];
    setRegisterData({
      ...registerData,
      logo: uploadedFile,
    });
  }

  function handleOnChange(
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  }

  function handleOnChangePhoneNumber(e: ChangeEvent<HTMLInputElement>) {
    const newNumber = e.target.value;
    setRegisterData({
      ...registerData,
      phone_number: newNumber.replace(/[^0-9]/g, ''),
    });
  }

  useEffect(() => {
    const style = computePreviewStyle(registerData.logo);
    setPreviewStyle(style);
  }, [registerData.logo]);

  return (
    <div id='basic-info'>
      <input
        type='file'
        onChange={handleSelectFile}
        name='logo'
        accept='image/*'
        ref={fileInputRef}
      />
      <button
        type='button'
        style={previewStyle}
        className='logo-preview'
        onClick={handleOpenFilesystem}
      >
        {!registerData.logo && <CameraIcon />}
      </button>
      <h1>Restaurant Basic Info</h1>
      <div className='input-group'>
        <div className='input-block'>
          <label htmlFor='name'>Name</label>
          <input
            onChange={handleOnChange}
            name='name'
            id='name'
            type='text'
            value={registerData.name}
          />
        </div>
        <div className='input-block'>
          <label htmlFor='phone_number'>Phone Number</label>
          <input
            onChange={handleOnChangePhoneNumber}
            name='phone_number'
            id='phone_number'
            placeholder='+55 ( ) 9 ____-____'
            type='text'
            value={registerData.phone_number}
          />
        </div>
      </div>
      <div className='textarea-block'>
        <label htmlFor='description'>Description</label>
        <textarea
          onChange={handleOnChange}
          name='description'
          rows={2}
          id='description'
          value={registerData.description}
        />
      </div>
    </div>
  );
}

export default BasicInfoForm;
