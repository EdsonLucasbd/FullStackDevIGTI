import axios from "axios";

const api = axios.create({ baseURL: 'api' });
const resource = '/transaction';

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

async function deleteTransaction(id) {
  await api.delete(`${resource}/${id}`);
  return;
}

async function updateTransaction(transaction) {
  const { id } = transaction;
  const completeTransaction = getCompleteTransaction(transaction);
  await api.put(`${resource}/${id}`, completeTransaction);

  const updateTransaction = prepareTransaction(completeTransaction);
  return updateTransaction;
}

async function postTransaction(transaction) {
  const completeTransaction = getCompleteTransaction(transaction);
  const { data } = await api.post(resource, completeTransaction);

  const newTransaction = prepareTransaction(data.transaction);
  return newTransaction;
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
  deleteTransaction,
  updateTransaction,
  postTransaction,
  ALL_PERIODS,
}