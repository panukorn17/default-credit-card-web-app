import React, { useState } from 'react';
import DataFetchingComponent from './DataComponent';
import PredictionComponent from './PredictComponent';

function ParentComponent() {
    const [originalData, setOriginalData] = useState<any>(null);
    
    return (
        <div>
            <PredictionComponent originalData={originalData} />
            <DataFetchingComponent setOriginalData={setOriginalData} />
        </div>
    );
}

export default ParentComponent;