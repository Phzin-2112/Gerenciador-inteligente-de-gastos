export const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(value) || 0);

export const getCurrentMonth = () => new Date().toISOString().slice(0, 7);

export const getPreviousMonth = (month) => {
  const [year, monthNumber] = month.split('-').map(Number);
  const previous = new Date(year, monthNumber - 1, 1);
  previous.setMonth(previous.getMonth() - 1);

  return `${previous.getFullYear()}-${String(previous.getMonth() + 1).padStart(2, '0')}`;
};

export const filterByMonth = (items, month) => items.filter((item) => item.data?.slice(0, 7) === month);

export const totalByCategory = (items, category) => items.filter((item) => item.categoria === category).reduce((total, item) => total + Number(item.valor || 0), 0);

export const getWeeklyTotals = (items) => [1, 2, 3, 4, 5, 6, 0].map((weekday) =>
  items.filter((item) => item.data && new Date(`${item.data}T00:00:00`).getDay() === weekday)
    .reduce((sum, item) => sum + Number(item.valor || 0), 0)
);

export const getMonthlyComparison = (currentItems, previousItems) => {
  const currentTotal = currentItems.reduce((sum, item) => sum + Number(item.valor || 0), 0);
  const previousTotal = previousItems.reduce((sum, item) => sum + Number(item.valor || 0), 0);
  const delta = currentTotal - previousTotal;

  return {
    currentTotal,
    previousTotal,
    delta,
    isHigher: delta > 0,
    isLower: delta < 0,
    isEqual: delta === 0,
  };
};
