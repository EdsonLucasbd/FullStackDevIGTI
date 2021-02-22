import React, { useState, useEffect } from "react";
import Transactions from "../../components/Transactions";

import Loader from "../../components/Loader";
import PeriodSelector from "../../components/PeriodSelector";
import Summary from "../../components/Summary";

import * as api from "../../services/api";

import "../../styles.css";
import ActionButtons from "../../components/ActionButtons";
import ModalTransaction from "../../components/Modal";

export default function Home() {
  const [currentTransactions, setCurrentTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const [allPeriods, setAllPeriods] = useState([])
  const [currentPeriod, setCurrentPeriod] = useState(null);
  const [filterText, setFilterText] = useState('');

  const [summaryData, setSummaryData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

    fetchData();
  }, [currentPeriod]);


  useEffect(() => {
    if (filterText.trim() === '') {
      setFilteredTransactions([...currentTransactions])
    } else {
      const lowerCaseFilter = filterText.toLowerCase();
      const newFilteredTransactions = currentTransactions.filter(
        transaction => {
          return transaction.descriptionLowerCase.includes(lowerCaseFilter)
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

  const handleDelete = async id => {
    await api.deleteTransaction(id);
    const newTransactions = currentTransactions.filter(
      transaction => transaction.id !== id
    );

    setCurrentTransactions(newTransactions);
    setFilteredTransactions(newTransactions);
  };

  const handleEdit = id => {
    const newSelectedTransaction = currentTransactions.find(
      transaction => transaction.id === id
    );

    setSelectedTransaction(newSelectedTransaction);
    setIsModalOpen(true);
  }

  const handleInsertTransaction = () => {
    setSelectedTransaction(null);
    setIsModalOpen(true);
  };

  const handleFilter = filteredText => {
    setFilterText(filteredText);
  };

  const handleModalClose = () => {
    setSelectedTransaction(null);
    setIsModalOpen(false);
  };

  const handleModalSave = async (newTransaction, mode) => {
    setIsModalOpen(false);

    if (mode === 'insert') {
      const postedTransaction = await api.postTransaction(newTransaction);

      let newTransactions = [...currentTransactions, postedTransaction];
      //newTransactions = sortTransactions(newTransactions);
      setCurrentTransactions(newTransactions);
      setFilteredTransactions(newTransactions);
      setSelectedTransaction(null);

      return;
    }

    if (mode === 'edit') {
      const updatedTransaction = await api.updateTransaction(newTransaction);
      const newTransactions = [...currentTransactions];

      const index = newTransactions.findIndex(
        transaction => transaction.id === newTransaction.id
      );

      newTransactions[index] = updatedTransaction;
      setCurrentTransactions(newTransactions);
      setFilteredTransactions(newTransactions);

      return;
    }

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
          <Summary transactions={summaryData}/>

          <ActionButtons
            filterText={filterText}
            isModalOpen={isModalOpen}
            onFilter={handleFilter}
            onNewTransaction={handleInsertTransaction}
          />

          <Transactions 
            transactions={filteredTransactions}
            onDeleteTransaction={handleDelete}
            onEditTransaction={handleEdit}
          />
        </>
      )}
        
      {isModalOpen && (
        <ModalTransaction 
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSave={handleModalSave}
          selectedTransaction={selectedTransaction}
        />
      )}
    </div>
  );
}
