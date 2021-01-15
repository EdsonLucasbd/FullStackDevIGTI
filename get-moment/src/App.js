import React, { useEffect, useState } from 'react';
import './App.css';
import dayjs from 'dayjs';
import "dayjs/locale/pt-br" ;

function App() {
  const today = dayjs();
  const [moment, setMoment] = useState([]);

  useEffect(() => {
    document.title = moment.length.toString();
  }, [moment]);

  function getMoment() {
    const newItem = today.locale('pt-br').format('dddd, DD/MM/YYYY, HH:mm:ss');
    
    console.log(today.format());
    setMoment([...moment, newItem]);
  }

  return (
    <div>
      <button onClick={() => getMoment()}>Clique aqui</button>
      <ul>
        {moment.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
