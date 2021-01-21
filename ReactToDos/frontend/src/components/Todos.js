import React from 'react'
import Summary from './Summary';
import {formatDateBR} from '../helpers/dateHelpers';
import Todo from './Todo';

export default function Todos({todos}) {
  let summary = {};
  let totalTasks = 0;
  let totalDone = 0;
  let totalNotDone = 0;
  let showHeader = false;
  let showSummary = false;
  let currentDate = '';

  const sumTotals = (done, clear = false) => {
    if (clear) {
      totalTasks = 0;
      totalDone = 0;
      totalNotDone = 0;
    }
    totalTasks++;
    done ? totalDone++ : totalNotDone++;
  };

  

  return (
    <div>
      {todos.map(({ id, date, description, done }, index) => {
        if (index === 0) {
          currentDate = date;
          showHeader = true;
          sumTotals(done);
        } else {
          if (index > 0 && currentDate !== date) {
            currentDate = date;
            showHeader = true;
            showSummary = true;
            summary = {
              totalTasks,
              totalDone,
              totalNotDone,
            };
            sumTotals(done, true);
          } else {
            showHeader = false;
            showSummary = false;
            sumTotals(done);
          }
        }
        
        return (
          <div key={id}>
            {showSummary && (
              <div>
                <Summary summary={summary} />{' '}
                <hr/>
              </div>
            )}
            {showHeader && (
              <div className="center">
                <strong>{formatDateBR(date)}</strong>
              </div>
            )}
            <Todo
              id={id}
              date={date}
              description={description}
              done={done}
            />
          </div>
        );
      })}
    </div>
  );
}