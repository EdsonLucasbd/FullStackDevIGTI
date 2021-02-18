const YEARS = [2019, 2020, 2021];

const MONTHS = [
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

const joinYearsMonths = () => {
  yearsAndMonths = [];
  let index = 0;

  YEARS.forEach(year => {
    MONTHS.forEach(month => {
      //id = `ym${year}-${index + 1}`,
      const id = `${year}-${month.toString().padStart(2, '0')}`;
      const monthDescription = `${month}/${year.toString()}`;
      yearsAndMonths.push({ id, description: monthDescription, index: index++ });
    });
  });
};
export const ALL_PERIODS = joinYearsMonths();

const prepareTransaction = (transaction) => {
  const { description, category, _id: id, month, ...otherFields } = transaction;

  return {
    id,
    description,
    category,
    month,
    descriptionLowerCase: description.toLowerCase(),
    categoryLowerCase: category.toLowerCase(),
    monthDescription: MONTHS[month],
    ...otherFields,
  };
}

export const getCurrentPeriod = (date) => {
  const today = new Date;
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const yearMonth = `${year}-${month.toString().padStart(2, '0')}`;
  const currentPeriod = date.find(({ id }) => id === yearMonth);
  
  return currentPeriod || { ...date[0] };
};

export async function getAllPeriods() {
  if (yearsAndMonths.length === 0) {
    joinYearsMonths();
  } 
  return yearsAndMonths;
}
