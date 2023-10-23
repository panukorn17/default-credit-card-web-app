import React, { useState } from 'react';
import makePrediction from '../api/PredictionService';
import { calculateAverages, DataInput } from '../utils/dataProcessing';

interface PredictionInput {
    AVRG_PAY: number[];
    AVRG_BILL: number[];
    limit_bal: number[];
}

const initialDataValues: DataInput = {
    id:0,
    limit_bal: 0,
    sex: 0,
    education: 0,
    marriage: 0,
    age: 0,
    pay_0: 0,
    pay_2: 0,
    pay_3: 0,
    pay_4: 0,
    pay_5: 0,
    pay_6: 0,
    bill_amt1: 0,
    bill_amt2: 0,
    bill_amt3: 0,
    bill_amt4: 0,
    bill_amt5: 0,
    bill_amt6: 0,
    pay_amt1: 0,
    pay_amt2: 0,
    pay_amt3: 0,
    pay_amt4: 0,
    pay_amt5: 0,
    pay_amt6: 0,
    default_payment_next_month: 0
};

type PredictionComponentProps = {
    originalData: DataInput[];
};

const PredictionComponent: React.FC<PredictionComponentProps> = ({ originalData }) => {
    // Now, you don't need to define a local state for originalData since it's passed from the parent component

    // State for processed input to the prediction
    const [predictionInput, setPredictionInput] = useState<PredictionInput>({ AVRG_PAY: [0], AVRG_BILL: [0], limit_bal: [0] });
    const [predictions, setPredictions] = useState<any[]>([]);  // Or a more specific type than any[]

    const handleSubmit = async () => {
        try {
            const processedData = calculateAverages(originalData); // Convert the original data
            setPredictionInput(processedData); // Store the processed data for potential use later
            const result = await makePrediction(processedData);  // Use the processed data
            setPredictions(result);
            console.log("Predictions:", result);
        } catch (error) {
            console.error("Error fetching predictions:", error);
        }
    };

    return (
        <div>
            {/* Your form or input fields to set or modify 'originalData' */}
            <button onClick={handleSubmit}>Get Predictions</button>
        </div>
    );
};

export default PredictionComponent;
