import { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import TransactionsPage from './pages/TransactionsPage';
import CategoriesPage from './pages/CategoriesPage';
import AddExpensePage from './pages/AddExpensePage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import { DEFAULT_CATEGORIES, DEFAULT_SETTINGS, getCategories, getExpenses, getSettings, resetAllStorage, saveCategories, saveExpenses, saveSettings } from './services/storageService';
import { getCurrentMonth } from './utils/formatters';

function App() {
  const [tab, setTab] = useState('inicio'); const [month, setMonth] = useState(getCurrentMonth()); const [search, setSearch] = useState(''); const [expenses, setExpenses] = useState(getExpenses); const [categories, setCategories] = useState(getCategories); const [settings, setSettings] = useState(getSettings);
  useEffect(() => {
    const theme = settings.theme === 'dark' ? 'dark' : 'light';
    document.body.dataset.theme = theme;
  }, [settings.theme]);
  const addExpense = (event) => { event.preventDefault(); const data = new FormData(event.currentTarget); const next = [...expenses, { id: Date.now(), descricao: String(data.get('descricao')).trim(), categoria: data.get('categoria'), valor: Number(data.get('valor')), data: data.get('data') }]; setExpenses(next); saveExpenses(next); event.currentTarget.reset(); setTab('transacoes'); };
  const deleteExpense = (id) => { const next = expenses.filter((item) => item.id !== id); setExpenses(next); saveExpenses(next); };
  const addCategory = (event) => { event.preventDefault(); const data = new FormData(event.currentTarget); const name = String(data.get('category-name')).trim(); const next = [...categories, { id: Date.now(), name, budget: Number(data.get('category-budget')) }]; setCategories(next); saveCategories(next); event.currentTarget.reset(); };
  const deleteCategory = (id) => { const next = categories.filter((item) => item.id !== id); setCategories(next); saveCategories(next); };
  const savePreferences = (event) => { event.preventDefault(); const data = new FormData(event.currentTarget); const next = { ...settings, monthlyBudget: Number(data.get('monthly-budget')), theme: data.get('theme-select') || 'light' }; setSettings(next); saveSettings(next); };
  const reset = () => { resetAllStorage(); setExpenses([]); setCategories(DEFAULT_CATEGORIES); setSettings(DEFAULT_SETTINGS); };
  const page = useMemo(() => { const common = { expenses, categories, settings, monthFilter: month, onMonthChange: setMonth }; switch (tab) { case 'transacoes': return <TransactionsPage {...common} searchTerm={search} onSearchChange={setSearch} onDeleteExpense={deleteExpense} />; case 'categorias': return <CategoriesPage {...common} onAddCategory={addCategory} onDeleteCategory={deleteCategory} />; case 'adicionar': return <AddExpensePage categories={categories} onAddExpense={addExpense} />; case 'relatorios': return <ReportsPage {...common} />; case 'configuracoes': return <SettingsPage settings={settings} onSaveSettings={savePreferences} onResetData={reset} />; default: return <DashboardPage {...common} searchTerm={search} onSearchChange={setSearch} />; } }, [tab, month, search, expenses, categories, settings]);
  return <div className="app-shell"><Sidebar activeTab={tab} onChangeTab={setTab} /><main className="content">{page}</main></div>;
}

createRoot(document.getElementById('root')).render(<App />);
