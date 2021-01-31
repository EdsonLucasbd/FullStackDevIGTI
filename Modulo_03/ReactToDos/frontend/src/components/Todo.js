import React from 'react'
import { formatDateBR } from '../helpers/dateHelpers'

import css from '../css/styles.module.css';

export default function Todo({id, date, description, done}) {
  return (
    <div 
      className={`card ${css.todo} ${done? 'green accent-3' : 'red'}`}
      >
      <div>
        <strong>{formatDateBR(date)}</strong> - {description}
      </div>
    </div >
  );
}
