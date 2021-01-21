import React, {useEffect, useState} from 'react';

import * as api from './api/api';
import * as dateHelper from './helpers/dateHelpers';

import Button from './components/Button';
import ButtonContainer from './components/ButtonContainer';
import Summary from './components/Summary';
import Todos from './components/Todos';

const SUMMARY = {
  totalTasks: 0,
  totalDone: 0,
  totalNoteDone: 0,
};

export default function App() {
  const years = dateHelper.getAllYears();
  const months = dateHelper.getAllMonths();
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedTodos, setSelectedTodos] = useState([]);
  const [summary, setSummary] = useState(SUMMARY);

  useEffect(() => {
    const getTasks = async () => {
      const tasks = await api.getTodosByYearMonth(
        selectedYear,
        selectedMonth
      );
      setSelectedTodos(tasks);
    };
     getTasks();
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    const summary = selectedTodos.reduce(
        (accumulator, { done }) => {
            accumulator.totalTasks++;
            done ? accumulator.totalDone++ : accumulator.totalNotDone++;
            return accumulator;
        },
        { totalTasks: 0, totalDone: 0, totalNotDone: 0 }
    );
    setSummary(summary);
  }, [selectedTodos]);

  const handleYearClick = (year) => {
    setSelectedYear(year);
  };

  const handleMonthClick = (monthNumber) => {
    setSelectedMonth(monthNumber);
  };

  return (
    <div className="container">
      <h1 className="center">React Todos</h1>

      <ButtonContainer>
        {years.map((year) => {
          return (
            <Button
              key={year}
              value={year}
              description={year}
              selected={selectedYear}
              color="indigo darken-4"
              onButtonClick={handleYearClick}
            />
          );
        })}
      </ButtonContainer>

      <ButtonContainer>
        {months.map(({ monthNumber, month }) => {
          return (
            <Button
              key={monthNumber}
              value={monthNumber}
              description={month}
              selected={selectedMonth}
              color="red darken 4"
              onButtonClick={handleMonthClick}
            />
          );
        })}
      </ButtonContainer>

      <Summary summary={summary} mainSummary={true} />

      <Todos  todos={selectedTodos} />
    </div>
  );
}
