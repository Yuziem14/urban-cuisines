import React, { useState, useEffect, createRef } from 'react';

import TagItem from '../../../components/Tag';

import { Tag } from '../../../interfaces';
import { useRegister } from '../../../contexts/register';
import api from '../../../services/api';

import { ReactComponent as CheckIcon } from '../../../assets/images/icons/check.svg';

import './styles.css';

function TagForm() {
  const customTagInputRef = createRef<HTMLInputElement>();
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const { registerData, setRegisterData } = useRegister();

  function handleSelectTag(selectedTag: Tag) {
    const index = registerData.tags.findIndex(tag => tag.id === selectedTag.id);
    const selectedCopy = [...registerData.tags];
    if (index !== -1) {
      selectedCopy.splice(index, 1);
    } else {
      selectedCopy.push(selectedTag);
    }

    setRegisterData({ ...registerData, tags: selectedCopy });
  }

  function handleCreateTag() {
    const tagName = customTagInputRef.current?.value.trim();
    if (!tagName) return;

    const customTagsArray = [...registerData.customTags];
    customTagsArray.push(tagName);
    setRegisterData({
      ...registerData,
      customTags: customTagsArray,
    });
  }

  function handleRemoveTag(selectedTag: string) {
    const index = registerData.customTags.findIndex(tag => tag === selectedTag);
    const selectedCopy = [...registerData.customTags];
    if (index !== -1) {
      selectedCopy.splice(index, 1);
    }

    setRegisterData({ ...registerData, customTags: selectedCopy });
  }

  useEffect(() => {
    api.get('tags').then(({ data }) => {
      setAllTags(data);
    });
  }, []);

  return (
    <div id='tags-form'>
      <h1>Restaurant Tags</h1>
      <div className='input-block'>
        <label htmlFor='tags'>Select some tags</label>
        <div className='tag-selector'>
          {allTags &&
            allTags.map((tag: Tag) => (
              <TagItem
                key={tag.id}
                name={tag.name}
                isSelected={registerData.tags.some(
                  selectedTag => selectedTag.id === tag.id
                )}
                onSelect={e => {
                  handleSelectTag(tag);
                }}
              />
            ))}
        </div>
      </div>
      <div className='input-block with-input-button'>
        <label htmlFor='custom-tags'>Or create a custom one</label>
        <div className='input-button'>
          <input
            ref={customTagInputRef}
            name='custom-tags[]'
            id='custom-tags'
            type='text'
          />
          <button type='reset' onClick={e => handleCreateTag()}>
            <CheckIcon />
          </button>
        </div>
      </div>
      <div className='custom-tags'>
        {registerData.customTags &&
          registerData.customTags.map((customTagName, index) => (
            <TagItem
              key={index}
              name={customTagName}
              onSelect={() => handleRemoveTag(customTagName)}
            />
          ))}
      </div>
    </div>
  );
}

export default TagForm;
