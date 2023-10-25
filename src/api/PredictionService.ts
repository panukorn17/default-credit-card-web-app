import axios from 'axios';

if (!process.env.REACT_APP_PREDICTION_URL) {
    throw new Error("Environment variable REACT_APP_PREDICTION_URL is not set.");
}
const predictionURL = process.env.REACT_APP_PREDICTION_URL;

async function makePrediction(data: any) {
    try {
        const response = await axios.post(predictionURL, data);
        return response.data;
    } catch (error) {
        console.error("Error sending data for prediction:", error);
        throw error;
    }
}

export default makePrediction;