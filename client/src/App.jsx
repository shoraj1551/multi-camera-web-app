import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

// Import additional components or utilities
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Counter from './components/common/Counter';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* Use the imported Header component */}
      <Header title="Welcome to Multi-Camera Web App" />

      <div>
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>

      {/* Use the imported Counter component */}
      <Counter count={count} setCount={setCount} />

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      {/* Use the imported Footer component */}
      <Footer />
    </>
  );
}

export default App;
