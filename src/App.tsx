import React from 'react';
import FadeOnScrollDiv from './components/FadeOnScrollDiv';
import './App.css';
import './styles/tailwind.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ParentComponent from './components/ParentComponent';

const App: React.FC = () => {
  return (
    <div className="App">
      <FadeOnScrollDiv>
        <header className="App-header">
          <h1 className = "text-7xl text-bold">Gaussian Mixture Model to Explore Credit Card Default Data</h1>
        </header>
      </FadeOnScrollDiv>
      <FadeOnScrollDiv>
        <div className="App-fullscreen">
          <h2 className="text-5xl p-5 text-bold">Introduction</h2>
          <div className="text-xl p-5 justify-text">
            <p className="p-5">
              This project uses a Gaussian Mixture Model with three mixture components to explore credit default data.
              The data contains information about 30,000 credit card holders in Taiwan from April to September 2005 (<a className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="https://archive.ics.uci.edu/dataset/350/default+of+credit+card+clients" target="_blank" rel="noopener noreferrer">source</a>).
              The currency of the data is New Taiwan dollars (NT$) which is equivalent to about 0.025 GBP. 
              The purpose of this analysis is exploratory. 
              By clustering the data, we can identify patterns and gain insights into the credit card holders.
              This helps us understand customer credit behaviour, and we can make better decisions when devising credit card offers or financial products.
              This will also guide how further statistical tests can be conducted to validate the initial findings and make more informed decisions.
            </p>
            <p className="p-5">
              The Gaussian Mixture Model is trained on and takes in the following features as inputs:
              <ol className="list-disc list-inside py-2">
                <li>Credit Limit (NT$)</li>
                <li>Average Bill Amount (NT$) from April to September</li>
                <li>Average Payment Amount (NT$) from April to September</li>
              </ol>
              The following sections include the analysis and visualisations of the data.
              The scatter plots are categorised by credit card holders that defaulted on their payments and those that did not as well as their education level.
              To make predictions on the data using the trained model and visualise the results, click the <a className="font-medium text-green-600 dark:text-green-500">Predict</a> button below.
            </p>
          </div>
        </div>
      </FadeOnScrollDiv>
      
      <ParentComponent />
    </div>
  );
}

export default App;
