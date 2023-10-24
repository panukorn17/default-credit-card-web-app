import React, { useState } from 'react';
import makePrediction from '../api/PredictionService';
import { DataInput } from '../utils/dataProcessing';
import ScatterPlot from './ScatterPlotComponent';

type PredictionComponentProps = {
    originalData: DataInput[];
};

const getFilteredDataAndIndices = (originalData: DataInput[], educationLevel:number) => {
    const filteredData: DataInput[] = [];
    const indices: number[] = [];
    originalData?.forEach((data, index) => {
        if (data.education === educationLevel) {
            filteredData.push(data);
            indices.push(index);
        }
    });
    return { filteredData, indices };
};


const getFilteredPredictiosn = (predictions: number[], indices: number[]) => {
    return indices.map(index => predictions[index]);
};

const PredictionComponent: React.FC<PredictionComponentProps> = ({ originalData }) => {
    const [predictions, setPredictions] = useState<number[]>([]);
    const [hasFetchedPredictions, setHasFetchedPredictions] = useState<boolean>(false);
    const [predictionsEd1, setPredictionsEd1] = useState<number[]>([]);
    const [predictionsEd2, setPredictionsEd2] = useState<number[]>([]);
    const [predictionsEd3, setPredictionsEd3] = useState<number[]>([]);
    const [predictionsEd4, setPredictionsEd4] = useState<number[]>([]);
    // filtered data
    const { filteredData: filteredDataEd1, indices: indicesEd1 } = getFilteredDataAndIndices(originalData, 1);
    const { filteredData: filteredDataEd2, indices: indicesEd2 } = getFilteredDataAndIndices(originalData, 2);
    const { filteredData: filteredDataEd3, indices: indicesEd3 } = getFilteredDataAndIndices(originalData, 3);
    const { filteredData: filteredDataEd4, indices: indicesEd4 } = getFilteredDataAndIndices(originalData, 4);
    const handleSubmit = async () => {
        try {
            const result = await makePrediction(originalData);  // Use the processed data
            console.log("Predictions:", result);
            setPredictions(result);
            setHasFetchedPredictions(true);

            // Get filtered Predictions
            setPredictionsEd1(getFilteredPredictiosn(result, indicesEd1));
            setPredictionsEd2(getFilteredPredictiosn(result, indicesEd2));
            setPredictionsEd3(getFilteredPredictiosn(result, indicesEd3));
            setPredictionsEd4(getFilteredPredictiosn(result, indicesEd4));
        } catch (error) {
            console.error("Error fetching predictions:", error);
        }
    };

    return (
        <div>
            {/* Your form or input fields to set or modify 'originalData' */}
            <button onClick={handleSubmit}>Get Predictions</button>
            <div className={'flex flex-wrap justify-center items-center'}>
                <ScatterPlot
                    width={600}
                    height={400}
                    data={originalData}
                    predictions={predictions}
                    hasFetchedPredictions={hasFetchedPredictions}
                    xAccessor={d => d.limit_bal}
                    yAccessor={d => d.AVRG_PAY} // Change the accessor based on the specific chart
                    title="Clusters Overall"
                    xlabel='Credit Limit'
                    ylabel='Average Payment'
                />
                <ScatterPlot
                    width={600}
                    height={400}
                    data={filteredDataEd1}
                    predictions={predictionsEd1}
                    hasFetchedPredictions={hasFetchedPredictions}
                    xAccessor={d => d.limit_bal}
                    yAccessor={d => d.AVRG_PAY} // Change the accessor based on the specific chart
                    title="Clusters for People with Post-Graduate Education"
                    xlabel='Credit Limit'
                    ylabel='Average Payment'
                />
                <ScatterPlot
                    width={600}
                    height={400}
                    data={filteredDataEd2}
                    predictions={predictionsEd2}
                    hasFetchedPredictions={hasFetchedPredictions}
                    xAccessor={d => d.limit_bal}
                    yAccessor={d => d.AVRG_PAY} // Change the accessor based on the specific chart
                    title="Clusters for People with University Education"
                    xlabel='Credit Limit'
                    ylabel='Average Payment'
                />
                <ScatterPlot
                    width={600}
                    height={400}
                    data={filteredDataEd3}
                    predictions={predictionsEd3}
                    hasFetchedPredictions={hasFetchedPredictions}
                    xAccessor={d => d.limit_bal}
                    yAccessor={d => d.AVRG_PAY} // Change the accessor based on the specific chart
                    title="Clusters for People with High School Education"
                    xlabel='Credit Limit'
                    ylabel='Average Payment'
                />
                <ScatterPlot
                    width={600}
                    height={400}
                    data={filteredDataEd4}
                    predictions={predictionsEd4}
                    hasFetchedPredictions={hasFetchedPredictions}
                    xAccessor={d => d.limit_bal}
                    yAccessor={d => d.AVRG_PAY} // Change the accessor based on the specific chart
                    title="Clusters for People with Other Education"
                    xlabel='Credit Limit'
                    ylabel='Average Payment'
                />
            </div>
            <div className={'flex flex-wrap justify-center items-center'}>
                <ScatterPlot
                    width={600}
                    height={400}
                    data={originalData}
                    predictions={predictions}
                    hasFetchedPredictions={hasFetchedPredictions}
                    xAccessor={d => d.AVRG_BILL}
                    yAccessor={d => d.AVRG_PAY} // Change the accessor based on the specific chart
                    title="Clusters Overall"
                    xlabel='Average Bill'
                    ylabel='Average Payment'
                />
                <ScatterPlot
                    width={600}
                    height={400}
                    data={filteredDataEd1}
                    predictions={predictionsEd1}
                    hasFetchedPredictions={hasFetchedPredictions}
                    xAccessor={d => d.AVRG_BILL}
                    yAccessor={d => d.AVRG_PAY} // Change the accessor based on the specific chart
                    title="Clusters for People with Post-Graduate Education"
                    xlabel='Average Bill'
                    ylabel='Average Payment'
                />
                <ScatterPlot
                    width={600}
                    height={400}
                    data={filteredDataEd2}
                    predictions={predictionsEd2}
                    hasFetchedPredictions={hasFetchedPredictions}
                    xAccessor={d => d.AVRG_BILL}
                    yAccessor={d => d.AVRG_PAY} // Change the accessor based on the specific chart
                    title="Clusters for People with University Education"
                    xlabel='Average Bill'
                    ylabel='Average Payment'
                />
                <ScatterPlot
                    width={600}
                    height={400}
                    data={filteredDataEd3}
                    predictions={predictionsEd3}
                    hasFetchedPredictions={hasFetchedPredictions}
                    xAccessor={d => d.AVRG_BILL}
                    yAccessor={d => d.AVRG_PAY} // Change the accessor based on the specific chart
                    title="Clusters for People with High School Education"
                    xlabel='Average Bill'
                    ylabel='Average Payment'
                />
                <ScatterPlot
                    width={600}
                    height={400}
                    data={filteredDataEd4}
                    predictions={predictionsEd4}
                    hasFetchedPredictions={hasFetchedPredictions}
                    xAccessor={d => d.AVRG_BILL}
                    yAccessor={d => d.AVRG_PAY} // Change the accessor based on the specific chart
                    title="Clusters for People with Other Education"
                    xlabel='Average Bill'
                    ylabel='Average Payment'
                />
            </div>
        </div>
    );
};

export default PredictionComponent;
