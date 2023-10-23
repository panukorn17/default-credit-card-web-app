import React, { useState, useEffect } from 'react';
import { fetchData } from '../api/DatabaseService';

type DataFetchingComponentProps = {
    setOriginalData: React.Dispatch<React.SetStateAction<any>>;
}

function DataFetchingComponent({ setOriginalData }: DataFetchingComponentProps) {
    // Declare a state variable to hold the fetched data
    const [data, setData] = useState<any>(null);
    // Declare another state variable for error handling (optional but recommended)
    const [error, setError] = useState<string | null>(null);

    // Use the useEffect hook to fetch data when the component mounts
    useEffect(() => {
        (async () => {
            try {
                const fetchedData = await fetchData();
                setData(fetchedData.slice(0, 10));
                setOriginalData(fetchedData); // Set the fetched data using the function from props
            } catch (err) {
                setError("Failed to fetch data");
                console.error(err);
            }
        })();
    }, [setOriginalData]);  // Added setOriginalData to dependency array since it's being used inside useEffect

    // Render the fetched data or an error message if there was an error
    return (
        <div>
            {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : error ? <p>{error}</p> : <p>Loading...</p>}
        </div>
    );
}

export default DataFetchingComponent;
