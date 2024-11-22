import { defineStore } from 'pinia';
import { fetchYears, fetchMakes, fetchModels } from '../services/apiService';

export const useVehicleStore = defineStore('vehicle', {
    state: () => ({
        years: [], // Stores the available years
        makes: [], // Stores the available makes based on the selected year
        models: [], // Stores the available models based on the selected make and year
        selectedYear: "", // Selected year for filtering
        selectedMake: "", // Selected make for filtering
        selectedModel: "", // Selected model for filtering
        isLoading: false,
        error: null,
    }),

    actions: {
        async loadData(apiCall, setter, params = []) {
            this.isLoading = true;
            this.error = null;

            try {
                const data = await apiCall(...params); // Call the API with parameters
                setter(data); // Use the setter function to update the state with fetched data
                this.isLoading = false;
            } catch (error) {
                this.isLoading = false;
                this.error = error.message || 'An unknown error occurred';
            }
        },

        // Load available years
        async loadYears() {
            await this.loadData(fetchYears, (data) => {
                this.years = data;
            });
        },

        // Load makes based on the selected year
        async loadMakes(year) {
            if (!year) {
                // Reset makes, selected make, and selected model if no year is provided
                this.makes = [];
                this.selectedMake = "";
                this.selectedModel = "";
                return;
            }
            // Load makes based on the year and update the state with the fetched data
            await this.loadData(fetchMakes, (data) => {
                if (data?.message) {
                    this.error = data.message;
                } else {
                    this.makes = data;
                    this.selectedMake = "";
                    this.selectedModel = "";
                }
            }, [year]);
        },

        // Load models based on selected year and make
        async loadModels(year, make) {
            if (!year || !make) {
                // Reset models and selected model if either year or make is missing
                this.models = [];
                this.selectedModel = "";
                return;
            }
            // Load models based on the year and make, then update the state with the fetched data
            await this.loadData(fetchModels, (data) => {
                if (data?.message) {
                    this.error = data.message;
                } else {
                    this.models = data;
                    this.selectedModel = "";
                }
            }, [year, make]);

        },
    },
});