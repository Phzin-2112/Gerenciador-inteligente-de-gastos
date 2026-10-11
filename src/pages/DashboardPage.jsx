import {
    formatCurrency,
    filterByMonth,
    getMonthlyComparison,
    getPreviousMonth,
    getWeeklyTotals,
    totalByCategory
} from '../utils/formatters';

export default function DashboardPage({
    expenses,
    categories,
    settings,
    monthFilter,
    onMonthChange,
    searchTerm,
    onSearchChange
}) {
    const monthExpenses = filterByMonth(expenses, monthFilter);
    const previousMonth = getPreviousMonth(monthFilter);
    const previousMonthExpenses = filterByMonth(expenses, previousMonth);

    const visibleExpenses = monthExpenses.filter((item) =>
        `${item.descricao} ${item.categoria}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    const total = visibleExpenses.reduce(
        (sum, item) => sum + Number(item.valor || 0),
        0
    );

    const budget = Number(settings.monthlyBudget) || 0;

    const remaining = Math.max(
        budget - total,
        0
    );

    const estimatedSavings = total * 0.3;

    const budgetPercentage = budget
        ? Math.round((total / budget) * 100)
        : 0;

    const monthlyComparison = getMonthlyComparison(monthExpenses, previousMonthExpenses);
    const comparisonLabel = monthlyComparison.delta === 0
        ? 'Sem variação em relação ao mês anterior'
        : monthlyComparison.delta > 0
            ? `+${formatCurrency(monthlyComparison.delta)} em relação ao mês anterior`
            : `${formatCurrency(monthlyComparison.delta)} em relação ao mês anterior`;

    const values = getWeeklyTotals(visibleExpenses);

    const ceiling = Math.max(
        500,
        Math.ceil(Math.max(...values, 0) / 500) * 500
    );

    const points = values
        .map(
            (value, index) =>
                `${40 + index * 110},${220 - (value / ceiling) * 170}`
        )
        .join(' ');

    const sortedCategories = [...categories].sort((a, b) =>
        a.name.localeCompare(b.name, 'pt-BR')
    );

    return (
        <>
            <header className="topbar">
                <div>
                    <h1>Visão geral</h1>
                    <p>
                        Acompanhe seus gastos e mantenha o orçamento
                        sob controle.
                    </p>
                </div>

                <div className="toolbar">
                    <input
                        className="control"
                        type="search"
                        placeholder="Buscar transações"
                        value={searchTerm}
                        onChange={(event) =>
                            onSearchChange(event.target.value)
                        }
                    />

                    <input
                        className="control month-control"
                        type="month"
                        value={monthFilter}
                        onChange={(event) =>
                            onMonthChange(event.target.value)
                        }
                    />
                </div>
            </header>

            <section className="cards-grid">
                <article className="stat-card">
                    <span>Despesas no período</span>

                    <strong>
                        {formatCurrency(total)}
                    </strong>

                    <small>
                        {budget
                            ? `${budgetPercentage}% do orçamento`
                            : 'Defina um orçamento'}
                    </small>
                    <small style={{ marginTop: '8px' }}>
                        {comparisonLabel}
                    </small>
                </article>

                <article className="stat-card">
                    <span>Orçamento mensal</span>

                    <strong>
                        {formatCurrency(remaining)}
                    </strong>

                    <small>
                        {formatCurrency(budget)} Entrada
                    </small>
                </article>

                <article className="stat-card">
                    <span>Economia estimada</span>

                    <strong>
                        {formatCurrency(estimatedSavings)}
                    </strong>

                    <small>
                        Meta projetada 30%
                    </small>
                </article>

                <article className="stat-card">
                    <span>Transações</span>

                    <strong>
                        {visibleExpenses.length}
                    </strong>

                    <small>
                        Registros no período
                    </small>
                </article>
            </section>

            <section className="dashboard-grid">
                <article className="panel chart-panel">
                    <div className="panel-heading">
                        <div>
                            <h2>Evolução semanal</h2>
                            <p>
                                Valores agrupados por dia da semana
                            </p>
                        </div>

                        <span className="legend">
                            <i />
                            Gastos
                        </span>
                    </div>

                    <div className="chart">
                        <svg
                            viewBox="0 0 700 280"
                            role="img"
                            aria-label="Evolução semanal de gastos"
                        >
                            <defs>
                                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#0f766e" />
                                    <stop offset="100%" stopColor="#34d399" />
                                </linearGradient>
                            </defs>

                            <g className="grid-lines">
                                <line
                                    x1="40"
                                    y1="50"
                                    x2="700"
                                    y2="50"
                                />

                                <line
                                    x1="40"
                                    y1="135"
                                    x2="700"
                                    y2="135"
                                />

                                <line
                                    x1="40"
                                    y1="220"
                                    x2="700"
                                    y2="220"
                                />
                            </g>

                            <polyline points={points} />

                            <g className="chart-labels">
                                {[
                                    'Seg',
                                    'Ter',
                                    'Qua',
                                    'Qui',
                                    'Sex',
                                    'Sáb',
                                    'Dom'
                                ].map((label, index) => (
                                    <text
                                        key={label}
                                        x={40 + index * 110}
                                        y="255"
                                        textAnchor="middle"
                                    >
                                        {label}
                                    </text>
                                ))}
                            </g>
                        </svg>

                        <div className="chart-scale">
                            <span>
                                {formatCurrency(ceiling)}
                            </span>

                            <span>
                                {formatCurrency(ceiling / 2)}
                            </span>

                            <span>
                                R$ 0
                            </span>
                        </div>
                    </div>
                </article>

                <aside className="panel">
                    <div className="panel-heading">
                        <div>
                            <h2>Orçamento por categoria</h2>
                            <p>Realizado no período</p>
                        </div>
                    </div>

                    <div className="budget-list">
                        {sortedCategories.map((category) => {
                            const spent = totalByCategory(
                                monthExpenses,
                                category.name
                            );

                            const percent = Math.min(
                                (spent /
                                    Math.max(
                                        Number(category.budget),
                                        1
                                    )) *
                                    100,
                                500
                            );

                            return (
                                <div
                                    className="budget-row"
                                    key={category.id}
                                >
                                    <div>
                                        <span>
                                            {category.name}
                                        </span>

                                        <strong>
                                            {formatCurrency(spent)}
                                        </strong>
                                    </div>

                                    <div className="progress">
                                        <i
                                            style={{
                                                width: `${percent}%`
                                            }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </aside>
            </section>
        </>
    );
}