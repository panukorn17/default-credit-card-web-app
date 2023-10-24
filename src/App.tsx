import React from 'react';
import './App.css';
import './styles/tailwind.css';
import ParentComponent from './components/ParentComponent';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className = "text-6xl text-bold">Gaussian Mixture Model to Explore Credit Default Data</h1>
      </header>
      <p>
        This project uses a Gaussian Mixture Model with three mixture components to explore credit default data that can be found <a href="https://archive.ics.uci.edu/dataset/350/default+of+credit+card+clients" target="_blank" rel="noopener noreferrer">here</a>.
      </p>
      
      <ParentComponent />
    </div>
  );
}

export default App;
