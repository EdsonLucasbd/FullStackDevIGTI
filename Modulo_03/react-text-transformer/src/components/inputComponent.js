import React from 'react';
import Copy from './copyText';
import './index.css';
import './inputComponent.css'

export default function Input(props) {
  const {
    id, 
    label, 
    placeholder,
    readOnly = false, 
    copyText = false,
    focus = false,
  } = props;

  return (
    <div className="col">
      <div className="sameRow">
        <div className="input-field s8" style={{ flex: 7 }}>
          <label htmlFor={id}>{label && label + ':'}</label>
          <input 
            type='text' 
            id={id} 
            placeholder={placeholder}
            readOnly={readOnly} 
            className="input-field"
            autoFocus={focus}
          />
        </div>
          {copyText && <Copy target={id} />}
      </div>
    </div>
  )
}
