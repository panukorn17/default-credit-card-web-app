import React, { useState, useMemo } from 'react';
import makePrediction from '../api/PredictionService';
import { DataInput } from '../utils/dataProcessing';
import ScatterPlot from './ScatterPlotComponent';

type PredictionComponentProps = {
    originalData: DataInput[];
};

type ScatterPlotConfig = {
    xAccessor: (data: DataInput) => number;
    yAccessor: (data: DataInput) => number;
    xlabel: string;
    ylabel: string;
};

const PredictionComponent: React.FC<PredictionComponentProps> = ({ originalData = [] }) => {
    const [predictions, setPredictions] = useState<number[]>([]);
    const [hasFetchedPredictions, setHasFetchedPredictions] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const educationLevels = [1, 2, 3, 4];
    const filteredDataAndIndices = useMemo(() => {
        return educationLevels.map(level => ({
            ...getFilteredDataAndIndices(originalData, level),
            level
        }));
    }, [originalData]);

    const handleSubmit = async () => {
        try {
            const result = await makePrediction(originalData);
            setPredictions(result);
            setHasFetchedPredictions(true);
        } catch (err) {
            setError("Failed to fetch data");
            console.error("Error fetching predictions:", err);
        }
    };

    const scatterPlotConfigs: ScatterPlotConfig[] = [
        {
            xAccessor: (d: DataInput) => d.limit_bal ?? 0,
            yAccessor: (d: DataInput) => d.AVRG_PAY ?? 0,
            xlabel: 'Credit Limit',
            ylabel: 'Average Payment'
        },
        {
            xAccessor: (d: DataInput) => d.AVRG_BILL ?? 0,
            yAccessor: (d: DataInput) => d.AVRG_PAY ?? 0,
            xlabel: 'Average Bill',
            ylabel: 'Average Payment'
        }
    ];

    return (
        <div>
            {originalData?.length > 0 ? (
                <div>
                    <button onClick={handleSubmit}>Get Predictions</button>
                    {scatterPlotConfigs.map(config => (
                        <div key={config.xlabel} className={'flex flex-wrap justify-center items-center'}>
                            {filteredDataAndIndices.map(({ filteredData, indices, level }) => (
                                <ScatterPlot
                                    key={level}
                                    width={600}
                                    height={400}
                                    data={filteredData}
                                    predictions={getFilteredPredictiosn(predictions, indices)}
                                    hasFetchedPredictions={hasFetchedPredictions}
                                    {...config}
                                    title={`Clusters for Education Level ${level}`}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

const getFilteredDataAndIndices = (originalData: DataInput[], educationLevel: number) => {
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

export default PredictionComponent;
