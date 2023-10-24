import React, { useState, useEffect } from 'react';
import { fetchData } from '../api/DatabaseService';
import '../styles/TableStyles.css';
import { calculateAverages } from '../utils/dataProcessing';

type DataFetchingComponentProps = {
    setOriginalData: React.Dispatch<React.SetStateAction<any>>;
}

interface TableRow {
    id: number;
    limit_bal: number;
    sex: number;
    education: number;
    marriage: number;
    age: number;
    pay_0: number;
    pay_2: number;
    pay_3: number;
    pay_4: number;
    pay_5: number;
    pay_6: number;
    bill_amt1: number;
    bill_amt2: number;
    bill_amt3: number;
    bill_amt4: number;
    bill_amt5: number;
    bill_amt6: number;
    pay_amt1: number;
    pay_amt2: number;
    pay_amt3: number;
    pay_amt4: number;
    pay_amt5: number;
    pay_amt6: number;
    default_payment_next_month: number;
    AVRG_PAY?: number;
    AVRG_BILL?: number;
}

function DataFetchingComponent({ setOriginalData }: DataFetchingComponentProps) {
    // Declare a state variable to hold the fetched data
    const [data, setData] = useState<TableRow[] | null>(null);
    // Declare another state variable for error handling (optional but recommended)
    const [error, setError] = useState<string | null>(null);

    // Use the useEffect hook to fetch data when the component mounts
    useEffect(() => {
        (async () => {
            try {
                const fetchedData = await fetchData();
                const processedData = calculateAverages(fetchedData); // Convert the original data
                // Merge original and processed data
                const averagedData = fetchedData.map((data: TableRow, index: number) => ({
                    ...data,
                    AVRG_PAY: processedData.AVRG_PAY[index],
                    AVRG_BILL: processedData.AVRG_BILL[index],
                }));
                setData(averagedData.slice(0, 10));
                setOriginalData(averagedData); // Set the fetched data using the function from props
            } catch (err) {
                setError("Failed to fetch data");
                console.error(err);
            }
        })();
    }, [setOriginalData]);  // Added setOriginalData to dependency array since it's being used inside useEffect

    // Render the fetched data or an error message if there was an error
    return (
		<div className="p-8 mt-6 lg:mt-0 bg-white overflow-x-auto">
        {data && data.length > 0 ? (
            <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b bg-neutral-50 font-medium dark:border-neutral-500">
                    <tr>
                        {Object.keys(data[0]).map((key, index) => (
                            <th className="px-6 py-4" key={index}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row: TableRow, rowIndex: number) => (
                        <tr 
                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600" 
                        key={rowIndex}>
                            {Object.values(row).map((value, valueIndex) => (
                                <td className="whitespace-nowrap px-6 py-4" key={valueIndex}>{value}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        ) : error ? (
            <p>{error}</p>
        ) : (
            <p>Loading...</p>
        )}
    </div>
    );
}

export default DataFetchingComponent;
