<template>
  <div class="flex flex-col gap-7 lg:flex-row">
    <!-- Year Dropdown -->
    <Dropdown id="year" label="Year" :options="vehicleStore.years" placeholder="Select Year"
      v-model="vehicleStore.selectedYear" @update:modelValue="handleYearChange" />

    <!-- Make Dropdown -->
    <Dropdown id="make" label="Make" :options="vehicleStore.makes" placeholder="Select Make"
      v-model="vehicleStore.selectedMake" :hasError="!vehicleStore.selectedYear" @update:modelValue="handleMakeChange"
      @click.native="checkError('make')" />

    <!-- Model Dropdown -->
    <Dropdown id="model" label="Model" :options="vehicleStore.models" placeholder="Select Model"
      v-model="vehicleStore.selectedModel" :hasError="!vehicleStore.selectedYear || !vehicleStore.selectedMake"
      @click.native="checkError('model')" />
  </div>
</template>

<script>
  import Dropdown from "@/components/Dropdown.vue";
  import { useVehicleStore } from "../stores/vehicleStore";

  export default {
    name: "VehicleDropdown",
    components: { Dropdown },
    setup(_, { emit }) {
      const vehicleStore = useVehicleStore();

      // Load available years on mount
      vehicleStore.loadYears();

      // Reset makes and models when the year changes
      const resetSelections = () => {
        vehicleStore.selectedMake = "";
        vehicleStore.selectedModel = "";
      };

      // Handle errors by emitting them to the parent
      const setError = (message) => {
        emit("error", message || null);
      };

      // Handle year change, resetting selections and loading makes
      const handleYearChange = () => {
        resetSelections();
        vehicleStore.loadMakes(vehicleStore.selectedYear);
        setError();
      };

      // Handle make change, resetting model and loading models
      const handleMakeChange = () => {
        vehicleStore.selectedModel = "";
        vehicleStore.loadModels(vehicleStore.selectedYear, vehicleStore.selectedMake);
        setError();
      };

      // Check if the necessary selection exists for each dropdown
      const checkError = (type) => {
        let errorMessage = null;

        if (type === "make" && !vehicleStore.selectedYear) {
          errorMessage = "Please select a Year first.";
        } else if (type === "model") {
          if (!vehicleStore.selectedYear) {
            errorMessage = "Please select a Year first.";
          } else if (!vehicleStore.selectedMake) {
            errorMessage = "Please select a Make first.";
          }
        }

        setError(errorMessage);
      };

      return {
        vehicleStore,
        handleYearChange,
        handleMakeChange,
        checkError,
      };
    },
  };
</script>