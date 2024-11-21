import axios from 'axios';

const api = axios.create({
    baseURL: 'https://new.api.nexusautotransport.com/api/vehicles', // Base URL for the API
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

// Centralized error handler for consistent error messages
const handleError = (error) => {
    if (error.response?.status === 404) {
        return { message: 'Resource not found' };
    }
    if (error.response?.status === 500) {
        return { message: 'Internal server error, please try again later' };
    }

    return error.response?.data || { message: 'An unknown error occurred' };
};

// Fetch years from the API
export const fetchYears = async () => {
    try {
        const response = await api.get('/years');
        return response.data.data;
    } catch (error) {
        return handleError(error);
    }
};

// Fetch makes by year
export const fetchMakes = async (year) => {
    try {
        const response = await api.get(`/makes?year=${year}`);
        return response.data.data.map(make => make.name);
    } catch (error) {
        return handleError(error);
    }
};

// Fetch models by year and make
export const fetchModels = async (year, make) => {
    try {
        const response = await api.get(`/models?year=${year}&make=${make}`);
        return response.data.data.map(model => model.model);
    } catch (error) {
        return handleError(error);
    }
};
