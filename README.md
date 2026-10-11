# 💰 Gerenciador de Gastos Inteligente

Um sistema moderno e responsivo de controle financeiro pessoal desenvolvido para demonstrar o domínio de conceitos avançados de **React**, **JavaScript** e **Vite**, focado em arquitetura limpa, escalabilidade e excelente experiência de usuário.

---

## 🎯 Objetivo do Projeto

Este projeto foi desenhado com o propósito de aplicar, na prática, os padrões de desenvolvimento mais exigidos pelo mercado atual. Mais do que uma ferramenta de gestão, ele reflete meu processo de aprendizado contínuo, demonstrando como resolvo problemas reais de engenharia de software no ecossistema Frontend.

---

## ⚡ Principais Funcionalidades

### 📈 Análise e Métricas
* **Dashboard Financeiro:** Resumo dinâmico e visual de receitas, despesas e saldo atual.
* **Gráfico de Evolução Semanal:** Visualização intuitiva de padrões de consumo e gastos.
* **Relatórios Inteligentes:** Exportação e leitura clara do histórico financeiro.

### ⚙️ Controle e Configurações
* **Gestão de Transações:** Fluxo completo para adicionar, remover e categorizar movimentações.
* **Limites por Categoria:** Sistema de alertas para orçamentos e tetos de gastos mensais.
* **Configuração de Orçamento:** Definição de metas e metas de economia personalizadas.

### 🎨 Experiência do Usuário (UX/UI)
* **Modo Claro e Escuro:** Interface adaptável à preferência do usuário para maior conforto visual.
* **Layout Responsivo:** Ajusta automaticamente para desktop, tablet e mobile sem quebrar a navegação.
* **Persistência de Dados:** Integração com `localStorage` para manter as informações salvas mesmo após fechar o navegador.

---

## 📐 Engenharia de Software & Arquitetura

O projeto foi estruturado sob o princípio de **Separação de Responsabilidades (SoC)**, garantindo que o código seja limpo, modular e fácil de testar.

```text
src/
├── components/   # Componentes atômicos e reutilizáveis de interface UI
├── context/      # Estado global previsível unificado via Context API
├── hooks/        # Lógica de negócio isolada através de Custom Hooks
├── pages/        # Telas e orquestração de visualizações
├── services/     # Camada de persistência e comunicação com APIs/Storage
└── utils/        # Funções puras (formatadores de moedas, datas e validadores)
```

### 🧠 Conceitos Técnicos Aplicados:
1. **Gerenciamento de Estado:** Uso estratégico de estados locais (`useState`), efeitos (`useEffect`) e estado global (`Context API`) sem re-renderizações desnecessárias.
2. **Modularização:** Componentização inteligente para reaproveitamento máximo de código.
3. **Imutabilidade:** Manipulação segura e previsível dos dados financeiros.

---

## 🛠️ Tecnologias Utilizadas

* **React** (Biblioteca principal de UI)
* **Vite** (Build tool ultra-rápido para desenvolvimento moderno)
* **JavaScript (ES6+)** (Manipulação assíncrona, métodos de array e lógica)
* **Vitest** (Testes automatizados para regras de negócio e utilitários)
* **GitHub Actions** (CI/CD para validar builds e testes em cada alteração)

---

## 🚀 Como Executar o Projeto Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/Phzin-2112/Gerenciador-de-Gastos.git
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Rode os testes:
   ```bash
   npm test
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
5. Gere o build de produção:
   ```bash
   npm run build
   ```

---

