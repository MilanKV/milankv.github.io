<template>
  <div class="flex items-start justify-center w-full min-h-screen p-16 bg-[#EEF0F1]">
    <div class="flex flex-col items-start w-full max-w-3xl bg-light-[#EEF0F1] p-6 md:p-12 rounded-md shadow-md">
      <!-- Header -->
      <div class="flex flex-row w-full justify-between mb-6">
        <h1 class="text-lg font-semibold mb-2 text-[#1B153A]">Vehicle Selector</h1>
        <!-- Loading indicator -->
        <div v-if="vehicleStore.isLoading" class="text-center text-gray-500">
          Loading...
        </div>
      </div>

      <!-- Vehicle Dropdown -->
      <VehicleDropdown @error="setErrorMessage" />

      <!-- Error Message -->
      <div v-if="errorMessage" :class="errorClass">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script>
  import VehicleDropdown from "@/components/VehicleDropdown.vue";
  import { useVehicleStore } from "../stores/vehicleStore";
  import { ref, computed } from "vue";

  export default {
    components: {
      VehicleDropdown,
    },
    setup() {
      const vehicleStore = useVehicleStore();
      const errorMessage = ref("");

      // Method to set or clear the error message
      const setErrorMessage = (message) => {
        errorMessage.value = message || "";
      };

      // Computed property for error message styling
      const errorClass = computed(() => "text-red-500 text-center mt-4");

      return {
        vehicleStore,
        errorMessage,
        setErrorMessage,
        errorClass,
      };
    },
  };
</script>