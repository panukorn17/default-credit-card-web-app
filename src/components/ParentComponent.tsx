import React, { useState } from 'react';
import DataFetchingComponent from './DataComponent';
import PredictionComponent from './PredictComponent';

function ParentComponent() {
    const [originalData, setOriginalData] = useState<any>(null);
    
    return (
        <div>
            <h2 className="text-5xl p-10 text-bold">Analysis and Visualisation</h2>
            <PredictionComponent originalData={originalData} />
            <h2 className="text-5xl p-10 pt-24 text-bold">Sample Data</h2>
            <DataFetchingComponent setOriginalData={setOriginalData} />
        </div>
    );
}

export default ParentComponent;