import React, { MouseEventHandler } from 'react';

import { ReactComponent as CloseIcon } from '../../assets/images/icons/close.svg';

import './styles.css';

interface TagProps {
  name: string;
  isSelected?: boolean;
  onSelect: MouseEventHandler;
}

export const TagItem: React.FC<TagProps> = ({
  name,
  isSelected = true,
  onSelect,
}) => {
  return (
    <button
      onClick={e => {
        onSelect(e);
      }}
      className={`tag ${!isSelected ? 'not-selected' : ''}`}
    >
      {name}
      <CloseIcon />
    </button>
  );
};

export default TagItem;
