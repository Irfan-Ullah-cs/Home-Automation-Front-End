import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api'; // Replace with your backend URL

export const fetchAllSensorsDataApi = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/last-24-sensor-readings`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch sensor data: ' + error.message);
  }
};

export const fetchAllLEDsApi = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/led-states`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch LED statuses: ' + error.message);
  }
};

// export const updateLEDStatusApi = async (ledNumber, status) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/led/${ledNumber}`, {
//       on: status,
//     });
//     return response.data;
//   } catch (error) {
//     throw new Error(`Failed to update LED ${ledNumber}: ` + error.message);
//   }
// };
export const updateLEDStatusApi = async (ledNumber, status) => {
  console.log(`Sending PATCH request for LED ${ledNumber} with status: ${status}`);
  try {
    const response = await axios.patch(`${API_BASE_URL}/led/${ledNumber}`, {
      on: status, // Ensure the correct toggle value is sent
    });
    console.log(`API Response for LED ${ledNumber}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error updating LED ${ledNumber}:`, error);
    throw new Error(`Failed to update LED ${ledNumber}: ${error.message}`);
  }
};




