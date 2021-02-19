import React, { useState, useEffect } from "react";

import ButtonPrevNext from "../../components/ButtonPrevNext";
import Loader from "../../components/Loader";
import Selection from "../../components/Selection";
import Summary from "../../components/Summary";

import * as api from "../../services/api";

import "../../styles.css";

export default function Home() {
  const [currentTransactions, setCurrentTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  //const [currentYearMonth, setCurrentYearMonth] = useState(getCurrentPeriod());

  const [allPeriods, setAllPeriods] = useState([])
  
  const [currentPeriod, setCurrentPeriod] = useState(null);
  const [filterText, setFilterText] = useState('');

  const [summaryData, setSummaryData] = useState(null);

  useEffect(() => {
    const getFullPeriods = async () => {
      const data = await api.getAllPeriods();
      setAllPeriods(data);

      setCurrentPeriod(api.getCurrentPeriod(data));
    };
    
    getFullPeriods();
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!currentPeriod) {
        return;
      }

      setCurrentTransactions([]);
      const transactions = await api.getTransactionsFrom(currentPeriod);
      setCurrentTransactions(transactions);
      console.log(transactions);
    } 

    /* setTimeout(() => {
      setIsLoading(false);
    }, 1000); */
    fetchData();
  }, [currentPeriod]);

  useEffect(() => {
    if (filterText.trim() === '') {
      setFilteredTransactions([...currentTransactions])
    } else {
      const lowerCaseFilter = filterText.toLowerCase();
      const newFilteredTransactions = currentTransactions.filter(
        transaction => {
          return transaction.descriplionLowerCase.includes(lowerCaseFilter)
        }
      );

      setFilteredTransactions(newFilteredTransactions);
    }

  }, [filterText, currentTransactions]);

  useEffect(() => {
    const summarizeData = () => {
      const total = filteredTransactions.length;

      const credit = filteredTransactions
        .filter(transaction => transaction.type === '+')
        .reduce((credit, transaction) => {
          return credit + transaction.value;
        }, 0);

      const debit = filteredTransactions
        .filter(transaction => transaction.type === '-')
        .reduce((debit, transaction) => {
          return debit + transaction.value;
        }, 0);

        const balance = credit - debit;

        setSummaryData({
          total,
          credit,
          debit,
          balance,
        });
    };
    summarizeData();
  }, [filteredTransactions]);

  function handleChangePeriod(newPeriod) {
    setCurrentPeriod(newPeriod);
  }
  function modifyYearMonth(BeforeAfter) {
    let index = api.ALL_PERIODS.indexOf(
      api.ALL_PERIODS.find((ym) => ym.value === currentPeriod)
    );

    eval(`index${BeforeAfter}${BeforeAfter}`);

    if (index < 0 || index === api.ALL_PERIODS.length) {
      return;
    }
    handleChangePeriod(api.ALL_PERIODS[index].value);
  }

  return (
    <div className="container">
      <div className="header">
        <h3>Bootcamp Full Stack IGTI - Desafio Final</h3>
        <h4>Controle Financeiro Pessoal</h4>
      </div>

      <div className="alignRow">
        <ButtonPrevNext value="-" onClick={modifyYearMonth} />
        <Selection
          values={allPeriods}
          selectedValue={currentPeriod}
          onChange={handleChangePeriod}
        />
        <ButtonPrevNext value="+" onClick={modifyYearMonth} />
      </div>

        {currentTransactions.length === 0 && <Loader />}
        {currentTransactions.length > 0 && (
          <>
            <hr/>
              <div>
                <Summary transactions={summaryData}/>
              </div>
            <hr/>
          </>
        )}
        
      <div className="alignRow">
        <button className="waves-effect btn">
          <i className="material-icons left">filter_list</i>
          Filtrar
        </button>
        <div className="input-field">
          <input type="text" id="inputFilter" />
        </div>
      </div>
    </div>
  );
}
