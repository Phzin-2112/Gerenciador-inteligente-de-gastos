const STORAGE_KEYS = {
  expenses: 'gastosApp.expenses',
  categories: 'gastosApp.categories',
  settings: 'gastosApp.settings',
};

export const DEFAULT_CATEGORIES = [
  { id: 1, name: 'Alimentação', budget: 3500 },
  { id: 2, name: 'Transporte', budget: 2000 },
  { id: 3, name: 'Moradia', budget: 5000 },
  { id: 4, name: 'Lazer', budget: 1800 },
  { id: 5, name: 'Saúde', budget: 1200 },
  { id: 6, name: 'Educação', budget: 1500 },
  { id: 7, name: 'Outros', budget: 1000 },
];

export const DEFAULT_SETTINGS = { monthlyBudget: 15000, theme: 'light' };

const read = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : JSON.parse(value);
  } catch {
    return fallback;
  }
};

const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));

export const getExpenses = () => {
  const expenses = read(STORAGE_KEYS.expenses, []);
  return Array.isArray(expenses) ? expenses : [];
};

export const saveExpenses = (expenses) => write(STORAGE_KEYS.expenses, expenses);

export const getCategories = () => {
  const categories = read(STORAGE_KEYS.categories, DEFAULT_CATEGORIES);
  return Array.isArray(categories) && categories.length ? categories : DEFAULT_CATEGORIES;
};

export const saveCategories = (categories) => write(STORAGE_KEYS.categories, categories);

export const getSettings = () => ({ ...DEFAULT_SETTINGS, ...read(STORAGE_KEYS.settings, {}) });

export const saveSettings = (settings) => write(STORAGE_KEYS.settings, { ...DEFAULT_SETTINGS, ...settings });

export const resetAllStorage = () => {
  saveExpenses([]);
  saveCategories(DEFAULT_CATEGORIES);
  saveSettings(DEFAULT_SETTINGS);
};
