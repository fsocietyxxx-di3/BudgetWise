# BudgetWise - Your Personal Finance Dashboard

BudgetWise is a modern, responsive, and intelligent web application designed to help you take control of your finances. With an intuitive interface and powerful features, you can easily track your expenses, manage your budgets, and gain valuable insights into your spending habits. This application is built with Next.js and leverages the power of Google's Gemini AI for expense prediction.

![BudgetWise Dashboard](https://imgur.com/a/0EzqAMW) 

## ✨ Key Features

- **Interactive Dashboard**: Get a quick overview of your financial health with key metrics like total spending, remaining budget, and top spending categories, all in one place.
- **Expense Tracking**: Easily add and view all your transactions. The mobile-friendly design ensures you can log expenses on the go.
- **Budget Management**: Set monthly budgets for different spending categories and track your progress with clear, color-coded progress bars.
- **Insightful Reports**: Analyze your spending habits over time with detailed charts and graphs for monthly spending and category breakdowns.
- **AI-Powered Predictions**: Leverage the power of AI to get a forecast of your spending for the next 30 days, helping you plan ahead.
- **Customizable Categories**: Tailor the app to your needs by adding, editing, or removing spending categories and their corresponding budgets.
- **Responsive Design**: Enjoy a seamless experience on any device, whether you're on a desktop, tablet, or smartphone.
- **Search Functionality**: Quickly find specific transactions with the built-in search feature.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/budgetwise.git
    cd budgetwise
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```
    or
    ```sh
    yarn install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of your project and add your Gemini API key. This is required for the expense prediction feature to work.
    ```
    GEMINI_API_KEY=your_gemini_api_key
    ```

4.  **Run the development server:**
    ```sh
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛠️ Built With

- **[Next.js](https://nextjs.org/)**: A React framework for building server-side rendered and static web applications.
- **[React](https://reactjs.org/)**: A JavaScript library for building user interfaces.
- **[TypeScript](https://www.typescriptlang.org/)**: A typed superset of JavaScript that compiles to plain JavaScript.
- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapid UI development.
- **[ShadCN UI](https://ui.shadcn.com/)**: A collection of re-usable components built with Radix UI and Tailwind CSS.
- **[Genkit](https://firebase.google.com/docs/genkit)**: A toolkit for building AI-powered features.
- **[Recharts](https://recharts.org/)**: A composable charting library built on React components.
- **[Lucide React](https://lucide.dev/)**: A beautiful and consistent icon toolkit.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your-username/budgetwise/issues).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
