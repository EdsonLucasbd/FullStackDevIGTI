import React from 'react'
import css from '../css/styles.module.css';

export default function Button({
  value,
  description,
  selected,
  color,
  onButtonClick,
}) {
  const handleButtonClick = (event) => {
    onButtonClick(event.target.value);
  };

  return (
    <div className={css.buttons}>
      <button 
        className={`btn waves-light waves-effect ${
        +selected === +value ? 'black' : color
        }`}
        value={value}
        onClick={handleButtonClick}
      >
        {description}
      </button>
    </div>
  )
}
