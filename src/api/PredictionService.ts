import axios from 'axios';

if (!process.env.REACT_APP_PREDICTION_URL) {
    throw new Error("Environment variable REACT_APP_PREDICTION_URL is not set.");
}
const predictionURL = process.env.REACT_APP_PREDICTION_URL;

async function makePrediction(data: any) {
    console.log("Data received by makePrediction:", data);
    try {
        const response = await axios.post(predictionURL, data);
        return response.data;  // Assuming the predictions are in the response data
    } catch (error) {
        console.error("Error sending data for prediction:", error);
        throw error;  // You might want to handle this differently based on your needs
    }
}

export default makePrediction;