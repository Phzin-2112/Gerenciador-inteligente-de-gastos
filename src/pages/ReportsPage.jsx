import {
    formatCurrency,
    filterByMonth,
    totalByCategory
} from '../utils/formatters';

export default function ReportsPage({
    expenses,
    categories,
    settings,
    monthFilter,
    onMonthChange
}) {
    const items = filterByMonth(
        expenses,
        monthFilter
    );

    const total = items.reduce(
        (sum, item) => sum + Number(item.valor || 0),
        0
    );

    const top = categories
        .map((category) => ({
            ...category,
            spent: totalByCategory(
                items,
                category.name
            )
        }))
        .sort((a, b) => b.spent - a.spent)[0];

    const sortedCategories = [...categories].sort(
        (a, b) =>
            a.name.localeCompare(
                b.name,
                'pt-BR'
            )
    );

    const averageDaily = total / 30;

    const budget = Number(
        settings.monthlyBudget
    ) || 0;

    const budgetUsed = budget
        ? Math.round((total / budget) * 100)
        : null;

    return (
        <>
            <header className="page-header">
                <div>
                    <h1>Relatórios</h1>

                    <p>
                        Uma leitura rápida do seu
                        comportamento financeiro.
                    </p>
                </div>

                <input
                    className="control"
                    type="month"
                    value={monthFilter}
                    onChange={(event) =>
                        onMonthChange(
                            event.target.value
                        )
                    }
                />
            </header>

            <section className="cards-grid reports">
                <article className="stat-card">
                    <span>Total gasto</span>

                    <strong>
                        {formatCurrency(total)}
                    </strong>
                </article>

                <article className="stat-card">
                    <span>Média diária</span>

                    <strong>
                        {formatCurrency(
                            averageDaily
                        )}
                    </strong>
                </article>

                <article className="stat-card">
                    <span>Maior categoria</span>

                    <strong>
                        {top?.name || '—'}
                    </strong>
                </article>

                <article className="stat-card">
                    <span>Orçamento usado</span>

                    <strong>
                        {budgetUsed !== null
                            ? `${budgetUsed}%`
                            : '—'}
                    </strong>
                </article>
            </section>

            <section className="panel report-list">
                {sortedCategories.map(
                    (category) => {
                        const spent =
                            totalByCategory(
                                items,
                                category.name
                            );

                        const percentage = total
                            ? (spent / total) * 100
                            : 0;

                        return (
                            <div
                                className="report-row"
                                key={category.id}
                            >
                                <div>
                                    <strong>
                                        {category.name}
                                    </strong>

                                    <span>
                                        {formatCurrency(
                                            spent
                                        )}
                                    </span>
                                </div>

                                <div className="progress">
                                    <i
                                        style={{
                                            width: `${percentage}%`
                                        }}
                                    />
                                </div>
                            </div>
                        );
                    }
                )}
            </section>
        </>
    );
}