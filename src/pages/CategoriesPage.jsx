import { formatCurrency, totalByCategory } from '../utils/formatters';

export default function CategoriesPage({
    categories,
    expenses,
    onAddCategory,
    onDeleteCategory
}) {
    return (
        <>
            <header className="page-header">
                <div>
                    <h1>Categorias</h1>
                    <p>Organize seus gastos com limites mensais.</p>
                </div>
            </header>

            <section className="two-columns">
                <form className="panel" onSubmit={onAddCategory}>
                    <h2>Nova categoria</h2>

                    <label>
                        Nome
                        <input
                            name="category-name"
                            className="field"
                            required
                            placeholder="Ex: Viagens"
                        />
                    </label>

                    <label>
                        Limite mensal
                        <input
                            name="category-budget"
                            className="field"
                            type="number"
                            min="0"
                            step="0.01"
                            required
                            placeholder="0,00"
                        />
                    </label>

                    <button className="primary-button" type="submit">
                        Adicionar categoria
                    </button>
                </form>

                <section className="panel">
                    <h2>Limites atuais</h2>

                    <div className="category-list">
                        {[...categories]
                            .sort((a, b) =>
                                a.name.localeCompare(b.name, 'pt-BR')
                            )
                            .map((category) => {
                                const spent = totalByCategory(
                                    expenses,
                                    category.name
                                );

                                const percent = Math.min(
                                    (spent / Math.max(category.budget, 1)) * 100,
                                    100
                                );

                                return (
                                    <div
                                        className="category-card"
                                        key={category.id}
                                    >
                                        <div>
                                            <strong>{category.name}</strong>
                                            <span>
                                                {formatCurrency(spent)} de{' '}
                                                {formatCurrency(category.budget)}
                                            </span>
                                        </div>

                                        <button
                                            className="text-button danger"
                                            type="button"
                                            onClick={() =>
                                                onDeleteCategory(category.id)
                                            }
                                        >
                                            Excluir
                                        </button>

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
                </section>
            </section>
        </>
    );
}