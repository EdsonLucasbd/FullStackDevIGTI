import axios from "axios";

const api = axios.create({ baseURL: 'http://localhost:3001/api' });
const resource = '/transaction';

/* async function fetchData(url) {
  const resource = await fetch(url);
  const json = await resource.json();
  return json;
}

export async function apiGetTransactionsByPeriod(yearMonth) {
  const url = `${baseUrl}find/?period=${yearMonth}`;
  const filteredTransactions = await fetchData(url);
  return filteredTransactions;
} */

const YEARS = [2019, 2020, 2021];
const GLOBAL_MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const MONTH_DESCRIPTIONS = [
  "",
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];
let yearsAndMonths = [];

function joinYearsMonths() {
  yearsAndMonths = [];
  let index = 0;

  YEARS.forEach(year => {
    GLOBAL_MONTHS.forEach(month => {
      //id = `ym${year}-${index + 1}`,
      const id = `${year}-${month.toString().padStart(2, '0')}`;
      const monthDescription = `${MONTH_DESCRIPTIONS[month]}/${year.toString()}`;
      yearsAndMonths.push({ id, description: monthDescription, index: index++ });
    });
  });
};
const ALL_PERIODS = joinYearsMonths();

function prepareTransaction(transaction) {
  const { description, category, _id: id, month, ...otherFields } = transaction;

  return {
    id,
    description,
    category,
    month,
    descriptionLowerCase: description.toLowerCase(),
    categoryLowerCase: category.toLowerCase(),
    monthDescription: MONTH_DESCRIPTIONS[month],
    ...otherFields,
  };
}

function getCurrentPeriod(date) {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const yearMonth = `${year}-${month.toString().padStart(2, '0')}`;
  const currentPeriod = date.find(({ id }) => id === yearMonth);
  
  return currentPeriod || { ...date[0] };
};

async function getAllPeriods() {
  if (yearsAndMonths.length === 0) {
    joinYearsMonths();
  } 
  return yearsAndMonths;
}


async function getTransactionsFrom(period) {
  const { id: yearMonth } = period;
  const { data } = await api.get(`${resource}?period=${yearMonth}`);

  const frontEndTransactions = data.transactions.map(transaction => {
    return prepareTransaction(transaction); 
  });

  return frontEndTransactions.sort((a, b) => 
  a.yearMonthDay.localeCompare(b.yearMonthDay)
  );
}

function getCompleteTransaction(transaction) {
  const { yearMonthDay } = transaction;
  const year = +yearMonthDay.substring(0, 4);
  const month = +yearMonthDay.substring(5, 7);
  const day = +yearMonthDay.substring(8, 10);

  const completeTransaction = {
    ...transaction,
    year,
    month,
    day,
  };

  return completeTransaction;
}

export {
  getCurrentPeriod,
  getAllPeriods,
  getTransactionsFrom,
  ALL_PERIODS,
}