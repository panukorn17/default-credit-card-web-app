import React, { useState } from 'react';
import makePrediction from '../api/PredictionService';
import { calculateAverages, DataInput } from '../utils/dataProcessing';
import ScatterPlot from './ScatterPlotComponent';

type PredictionComponentProps = {
    originalData: DataInput[];
};

const PredictionComponent: React.FC<PredictionComponentProps> = ({ originalData }) => {
    const [predictions, setPredictions] = useState<number[]>([]);
    const [hasFetchedPredictions, setHasFetchedPredictions] = useState<boolean>(false);
    // Filter the data
    const filteredDataEd1 =  originalData ? originalData.filter(d => d.education === 1) : [];
    const filteredDataEd2 =  originalData ? originalData.filter(d => d.education === 2) : [];
    const handleSubmit = async () => {
        try {
            const processedData = calculateAverages(originalData); // Convert the original data
            const result = await makePrediction(processedData);  // Use the processed data
            console.log("Predictions:", result);
            console.log("Filtered Ed 1:", filteredDataEd1);
            console.log("Filtered Ed 2:", filteredDataEd2);
            setPredictions(result);
            setHasFetchedPredictions(true);
        } catch (error) {
            console.error("Error fetching predictions:", error);
        }
    };

    return (
        <div>
            {/* Your form or input fields to set or modify 'originalData' */}
            <button onClick={handleSubmit}>Get Predictions</button>
            <div className={'flex'}>
                
            <ScatterPlot
                width={500}
                height={400}
                data={filteredDataEd1}
                predictions={predictions}
                hasFetchedPredictions={hasFetchedPredictions}
                xAccessor={d => d.limit_bal}
                yAccessor={d => d.bill_amt1} // Change the accessor based on the specific chart
                title="Clusters within Postgraduate Group"
            />                
            <ScatterPlot
                width={500}
                height={400}
                data={filteredDataEd2}
                predictions={predictions}
                hasFetchedPredictions={hasFetchedPredictions}
                xAccessor={d => d.limit_bal}
                yAccessor={d => d.bill_amt1} // Change the accessor based on the specific chart
                title="Clusters within University Group"
            />
            </div>
        </div>
    );
};

export default PredictionComponent;
