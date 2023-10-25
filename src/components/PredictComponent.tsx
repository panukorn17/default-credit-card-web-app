import React, { useState, useMemo } from 'react';
import makePrediction from '../api/PredictionService';
import { DataInput } from '../utils/dataProcessing';
import ScatterPlot from './ScatterPlotComponent';
import '../styles/PredictComponentStyles.css';

type PredictionComponentProps = {
    originalData: DataInput[];
};

type ScatterPlotConfig = {
    xAccessor: (data: DataInput) => number;
    yAccessor: (data: DataInput) => number;
    xlabel: string;
    ylabel: string;
};


const educationLevels = [1, 2, 3, 4];
const educationLevelNames = ['Graduate School', 'University', 'High School', 'Other'];

const MemoizedScatterPlot = React.memo(ScatterPlot);

const PredictionComponent: React.FC<PredictionComponentProps> = ({ originalData = [] }) => {
    const [predictions, setPredictions] = useState<number[]>([]);
    const [hasFetchedPredictions, setHasFetchedPredictions] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const filteredDataAndIndices = useMemo(() => {
        return educationLevels.map(level => ({
            ...getFilteredDataAndIndices(originalData, level),
            level
        }));
    }, [originalData]);

    const filteredPredictions = useMemo(() => {
        return filteredDataAndIndices.map(({ indices }) => getFilteredPredictions(predictions, indices));
    }, [predictions, filteredDataAndIndices]);

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const result = await makePrediction(originalData);
            setPredictions(result);
            setHasFetchedPredictions(true);
        } catch (err) {
            setError("Failed to fetch data");
            console.error("Error fetching predictions:", err);
        }
        setIsLoading(false);
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
                    <button 
                        onClick={handleSubmit}
                        className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="flex loading-dots space-x-2 justify-between p-1 items-center">
                                <i className="fas fa-circle fa-fade"></i>
                                <i className="fas fa-circle fa-fade"></i>
                                <i className="fas fa-circle fa-fade"></i>
                            </div>
                        ) : (
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                Predict
                            </span>
                        )}
                    </button>
                    {scatterPlotConfigs.map((config) => (
                        <div key={config.xlabel} className={'flex flex-wrap justify-center items-center'}>
                            {filteredDataAndIndices.map(({ filteredData, level }, dataIndex) => (
                                <MemoizedScatterPlot
                                    key={level}
                                    width={600}
                                    height={400}
                                    data={filteredData}
                                    predictions={filteredPredictions[dataIndex]}
                                    hasFetchedPredictions={hasFetchedPredictions}
                                    {...config}
                                    title={`Clusters for ${educationLevelNames[level-1]} Level of Education`}
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
    const indices: number[] = [];
    const filteredData = originalData?.filter((data, index) => {
        if (data.education === educationLevel) {
            indices.push(index);
            return true;
        }
        return false;
    });
    return { filteredData, indices };
};

const getFilteredPredictions = (predictions: number[], indices: number[]) => {
    return indices.map(index => predictions[index]);
};

export default PredictionComponent;
