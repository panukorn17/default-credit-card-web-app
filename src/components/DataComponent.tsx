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

const tableHeaders = [  'ID',
                        'Given Credit NT$',
                        'Gender',
                        'Education',
                        'Marital Status',
                        'Age',
                        'Pay Status (Apr)',
                        'Pay Status (May)',
                        'Pay Status (Jun)',
                        'Pay Status (Jul)',
                        'Pay Status (Aug)',
                        'Pay Status (Sep)',
                        'Bill Amount NT$ (Apr)',
                        'Bill Amount NT$ (May)',
                        'Bill Amount NT$ (Jun)',
                        'Bill Amount NT$ (Jul)',
                        'Bill Amount NT$ (Aug)',
                        'Bill Amount NT$ (Sep)',
                        'Pay Amount NT$ (Apr)',
                        'Pay Amount NT$ (May)',
                        'Pay Amount NT$ (Jun)',
                        'Pay Amount NT$ (Jul)',
                        'Pay Amount NT$ (Aug)',
                        'Pay Amount NT$ (Sep)',
                        'Default Payment in October',
                        'Average Payment NT$ (Apr-Sep)',
                        'Average Bill NT$ (Apr-Sep)'];

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
                // Check if data is not empty
                if (fetchedData.length === 0) {
                    setError("No data available.");
                    return;
                }
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
    }, [setOriginalData]);

    // Render the fetched data or an error message if there was an error
    return (
		<div className="p-8 mt-6 lg:mt-0 bg-white overflow-x-auto">
        {data && data.length > 0 ? (
            <table className="min-w-full text-left text-sm font-light">
                <thead className="text-center w-1/12 border-b bg-neutral-50 font-medium dark:border-neutral-500">
                    <tr>
                        {Object.keys(tableHeaders).map((key, index) => (
                            <th className="px-6 py-4" key={index}>{tableHeaders[index]}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row: TableRow, rowIndex: number) => (
                        <tr 
                        className="text-center w-1/12 border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600" 
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
