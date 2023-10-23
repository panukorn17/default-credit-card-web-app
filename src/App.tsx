import React from 'react';
import './App.css';
import ParentComponent from './components/ParentComponent';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Gaussian Mixture Model to Explore Credit Default Data</h1>
      </header>
      <ParentComponent />
    </div>
  );
}

export default App;
