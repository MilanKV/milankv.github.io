<template>
  <main>
    <Home />
    <div v-if="vehicleStore.error"
      class="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-4 rounded-md">
      {{ vehicleStore.error }}
    </div>
  </main>
</template>

<script>
  import Home from '@/views/Home.vue'
  import { useVehicleStore } from "@/stores/vehicleStore";

  export default {
    components: {
      Home,
    },
    setup() {
      const vehicleStore = useVehicleStore();

      return {
        vehicleStore,
      };
    },
  };
</script>