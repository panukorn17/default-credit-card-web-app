import axios from 'axios';

if (!process.env.REACT_APP_DATA_URL) {
    throw new Error("Environment variable REACT_APP_DATA_URL is not set.");
}
const dataURL = process.env.REACT_APP_DATA_URL;

export const fetchData = async() => {
    try {
        const response = await axios.get(dataURL);
        return response.data;
    } catch (error) {
        console.log("Error fetching data:", error);
    }
};