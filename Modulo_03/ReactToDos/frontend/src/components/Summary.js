import React from 'react'

import css from '../css/styles.module.css';

export default function Summary({summary, mainSummary}) {
  const {  totalTasks, totalDone, totalNotDone } = summary;
  return (
    <div className={mainSummary ? css.mainSummary : css.subSummary}>
      <div>
        Total de tarefas:{' '}
        <span>{totalTasks}</span>
      </div>
      <div>
        Tarefas cumpridas:{' '}
        <span className="green-text text-accent-3">{totalDone}</span>
      </div>
      <div>
        Tarefas não cumpridas:{' '}
        <span className="red-text ">{totalNotDone}</span>
      </div>
    </div>
  );
}
