import React, { useState } from 'react';
import DataFetchingComponent from './DataComponent';
import PredictionComponent from './PredictComponent';

function ParentComponent() {
    const [originalData, setOriginalData] = useState<any>(null);
    
    return (
        <div>
            <DataFetchingComponent setOriginalData={setOriginalData} />
            <PredictionComponent originalData={originalData} />
        </div>
    );
}

export default ParentComponent;