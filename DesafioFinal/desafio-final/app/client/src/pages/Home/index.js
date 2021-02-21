import React, { useState, useEffect } from "react";
import Transactions from "../../components/Transactions";

import Loader from "../../components/Loader";
import PeriodSelector from "../../components/PeriodSelector";
import Summary from "../../components/Summary";

import * as api from "../../services/api";

import "../../styles.css";

export default function Home() {
  const [currentTransactions, setCurrentTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const [allPeriods, setAllPeriods] = useState([])
  
  const [currentPeriod, setCurrentPeriod] = useState(null);
  const [filterText, setFilterText] = useState('');

  const [summaryData, setSummaryData] = useState(null);

  //carrega o periodo atual ao iniciar a app
  useEffect(() => {
    const getFullPeriods = async () => {
      const data = await api.getAllPeriods();
      setAllPeriods(data);

      setCurrentPeriod(api.getCurrentPeriod(data));
    };
    
    getFullPeriods();
  }, []);
  
  //monitora o periodo atual e carrega as transações deste período
  useEffect(() => {
    const fetchData = async () => {
      if (!currentPeriod) {
        return;
      }

      setCurrentTransactions([]);
      const transactions = await api.getTransactionsFrom(currentPeriod);
      setCurrentTransactions(transactions);
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

  //carrega as informações do sumario de acordo com as transações filtradas
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

  const handlePeriodChange = newPeriod => {
    setCurrentPeriod(newPeriod);
  };

  return (
    <div className="container">
      <div className="header">
        <h3>Bootcamp Full Stack IGTI - Desafio Final</h3>
        <h4>Controle Financeiro Pessoal</h4>
      </div>

      <PeriodSelector
        allPeriodsValues={allPeriods}
        selectedValue={currentPeriod}
        onChangePeriod={handlePeriodChange}
      />

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

      <Transactions 
        transactions={filteredTransactions}
      />

    </div>
  );
}
