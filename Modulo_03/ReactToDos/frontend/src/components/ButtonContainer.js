import React from 'react'
import css from '../css/styles.module.css';

export default function ButtonContainer({children}) {
  return <div className={css.flexRow}>{children}</div>;
}

