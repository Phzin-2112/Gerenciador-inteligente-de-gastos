const items = [
  ['inicio', 'Início', '⌂'],
  ['transacoes', 'Transações', '≡'],
  ['categorias', 'Categorias', '◫'],
  ['adicionar', 'Adicionar gasto', '+'],
  ['relatorios', 'Relatórios', '▥'],
  ['configuracoes', 'Configurações', '⚙'],
];

export default function Sidebar({ activeTab, onChangeTab }) {
  return (
    <aside className="sidebar">
      <div className="brand"><span className="brand-mark">$</span><span>Gestão Gastos</span></div>
      <nav className="nav" aria-label="Navegação principal">
        {items.map(([key, label, icon]) => (
          <button key={key} className={`nav-item ${activeTab === key ? 'active' : ''}`} type="button" onClick={() => onChangeTab(key)}>
            <span className="nav-icon" aria-hidden="true">{icon}</span><span>{label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
