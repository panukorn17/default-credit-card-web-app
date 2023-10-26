import React, { useState, useMemo } from 'react';
import makePrediction from '../api/PredictionService';
import { DataInput } from '../utils/dataProcessing';
import ScatterPlot from './ScatterPlotComponent';
import FadeOnScrollDiv from './FadeOnScrollDiv';
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

const paymentStatuses = [1, 0];

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

    const filteredDataAndIndicesByPaymentStatus = useMemo(() => {
        return paymentStatuses.map(status => ({
            ...getFilteredDataAndIndicesByPaymentStatus(originalData, status),
            paymentStatus: status
        }));
    }, [originalData]);
    
    const filteredPredictionsByPaymentStatus = useMemo(() => {
        return filteredDataAndIndicesByPaymentStatus.map(({ indices }) => getFilteredPredictions(predictions, indices));
    }, [predictions, filteredDataAndIndicesByPaymentStatus]);

    const handleSubmit = async () => {
        setIsLoading(true);
    
        if (hasFetchedPredictions) {
            setTimeout(() => {
                setHasFetchedPredictions(false);
                setPredictions([]);
                setIsLoading(false);
            }, 500);
            return;
        }
    
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
            xlabel: 'Average Monthly Payment NT$ (Apr-Sep)',
            ylabel: 'Given Credit NT$'
        },
        {
            xAccessor: (d: DataInput) => d.AVRG_BILL ?? 0,
            yAccessor: (d: DataInput) => d.AVRG_PAY ?? 0,
            xlabel: 'Average Monthly Payment NT$ (Apr-Sep)',
            ylabel: 'Average Monthly Bill NT$ (Apr-Sep)'
        }
    ];

    return (
        <div>
            {originalData?.length > 0 ? (
                <div className="py-2.5">
                    <div className="flex justify-center items-center h-20">
                        <button 
                            onClick={handleSubmit}
                            className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-m font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex loading-dots space-x-2 justify-between px-4 py-2.5 items-center">
                                    <i className="fas fa-circle fa-fade"></i>
                                    <i className="fas fa-circle fa-fade"></i>
                                    <i className="fas fa-circle fa-fade"></i>
                                </div>
                            ) : hasFetchedPredictions ? (
                                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    Reset
                                </span>
                            )  : (
                                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    Predict
                                </span>
                            )}
                        </button>
                    </div>
                    <div className="pt-8">
                        <h2 className="text-4xl p-10 text-bold">Default Status Plots</h2>
                        {scatterPlotConfigs.map((config, configIndex) => (
                            <div key={config.xlabel} className={'flex flex-wrap justify-center items-center'}>
                                {filteredDataAndIndicesByPaymentStatus.map(({ filteredData, paymentStatus }, dataIndex) => (
                                    <MemoizedScatterPlot
                                        key={paymentStatus}
                                        width={700}
                                        height={400}
                                        data={filteredData}
                                        predictions={filteredPredictionsByPaymentStatus[dataIndex]}
                                        hasFetchedPredictions={hasFetchedPredictions}
                                        showLegend={hasFetchedPredictions && configIndex === 0 && dataIndex === 0}
                                        {...config}
                                        title={`Clusters for Individuals that ${paymentStatus === 1 ? "Defaulted" : "did not Default"} in October`}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                    <FadeOnScrollDiv>
                        <div className="App-fullscreen">
                        <h2 className="text-5xl p-5 text-bold">Insights</h2>
                        <div className="text-xl p-5 justify-text">
                            <h3 className="text-3xl pl-5 text-bold">Individuals who defaulted</h3>
                            <p className="p-5">
                                Individuals who defaulted on their payment in October tend to have varying credit limits, although more concentrated in the lower end and lower average monthly payments.
                                This is particularly evident in individuals in <a className="font-medium text-green-400 dark:text-green-300">cluster 2</a> and <a className="font-medium text-orange-400 dark:text-orange-300"> cluster 3</a>.
                                This may imply that those with <a className="font-medium text-red-600 dark:text-red-500">lower credit limits have worse financial health</a> and can only afford to pay back a smaller amount of their credit, which <a className="font-medium text-red-600 dark:text-red-500">may lead to defaulting on their payments.</a>
                            </p>
                            <h3 className="text-3xl pl-5 text-bold">Individuals who did not default</h3>
                            <p className="p-5">
                                Individuals who did not default on their payment in October tend to have a higher credit limit, average monthly bills and average monthly payments.
                                This is significantly evident in individuals in <a className="font-medium text-blue-600 dark:text-blue-500">cluster 1</a>, where most individuals in cluster 1 did not default on their payments.
                                This may imply that those with <a className="font-medium text-blue-600 dark:text-blue-500">higher credit limits have better financial health</a> and can afford to pay back a larger amount of their credit.
                            </p>
                        </div>
                        </div>
                    </FadeOnScrollDiv>
                    <div className="pt-20">
                        <h2 className="text-4xl p-10 text-bold">Education Level Plots</h2>
                        {scatterPlotConfigs.map((config, configIndex) => (
                            <div key={config.xlabel} className={'flex flex-wrap justify-center items-center py-10'}>
                                {filteredDataAndIndices.map(({ filteredData, level }, dataIndex) => (
                                    <MemoizedScatterPlot
                                        key={level}
                                        width={700}
                                        height={400}
                                        data={filteredData}
                                        predictions={filteredPredictions[dataIndex]}
                                        hasFetchedPredictions={hasFetchedPredictions}
                                        showLegend={hasFetchedPredictions && configIndex === 0 && dataIndex === 0}
                                        {...config}
                                        title={`Clusters for ${educationLevelNames[level-1]} Level of Education`}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                    <FadeOnScrollDiv>
                        <div className="App-fullscreen">
                            <h2 className="text-5xl p-5 text-bold">Insights</h2>
                            <div className="text-xl p-5 justify-text">
                                <h3 className="text-3xl pl-5 text-bold">Education level and defaulting</h3>
                                <p className="p-5">
                                Graduate School and University education level: Individuals with graduate-level and university level-education have a wide range of credit limits.
                                They also tend to have higher monthly payment amounts, with a significant proportion classified as <a className="font-medium text-blue-600 dark:text-blue-500">cluster 1</a>.
                                This may imply that those with this level of education are more financially stable and are less likely to default on their payments.
                                </p>
                                <p className="p-5">
                                High School  education level: Individuals with high school education have a lower credit limit, with their monthly payments relatively dispersed.
                                There is a significant proportion classified as <a className="font-medium text-green-400 dark:text-green-300">cluster 2</a> and <a className="font-medium text-orange-600 dark:text-orange-500">cluster 3</a>.
                                This may imply that those with this level of education are less financially stable and are more likely to default on their payments.
                                </p>
                            </div>
                            <h2 className="text-5xl p-5 text-bold">Further Analysis and Implications</h2>
                            <div className="text-xl p-5 text-bold justify-text"> 
                                <p className="px-5">Further examination of the financial behaviours of individuals with lower credit limits, payments and education levels may help <a className="font-medium text-red-400 dark:text-red-300">improve understanding of the underlying causes of default</a>.</p> 
                                <p className="px-5">Financial products and credit limit/card offers can be devised with these insights. For example, <a className="font-medium text-red-400 dark:text-red-300">financial literacy programs can be offered to high-risk individuals to mitigate the risk of default</a>.</p> 
                                <p className="px-5">Further statistical tests can be done to <a className="font-medium text-red-400 dark:text-red-300">validate the characteristics of individuals with a higher risk of default</a>.</p>
                            </div>
                        </div>
                    </FadeOnScrollDiv>
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

const getFilteredDataAndIndicesByPaymentStatus = (originalData: DataInput[], paymentStatus: number) => {
    const indices: number[] = [];
    const filteredData = originalData?.filter((data, index) => {
        if (data.default_payment_next_month === paymentStatus) {
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
