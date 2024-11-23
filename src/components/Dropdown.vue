<template>
  <div class="relative" ref="dropdownContainer">
    <label :for="id" class="block text-medium font-regular mb-2 text-[#1B153A]">{{ label }}</label>
    <div
      class="dropdown-trigger w-[180px] p-3 border border-[#E8E9EA] bg-[#F3F6FA] rounded flex justify-between items-center cursor-pointer gap-4 select-none"
      @click="handleToggle">
      <span class="text-[#1B153A]">{{ selectedLabel || placeholder }}</span>
      <img src="@/assets/images/Arrow.svg" class="transition-transform" :class="{ 'rotate-180': isOpen }" alt="Arrow">
    </div>

    <ul v-if="isOpen"
      class="dropdown-list absolute bg-[#F3F6FA] border border-[#E8E9EA] w-[180px] mt-1 max-h-60 overflow-y-auto overflow-x-hidden shadow-md rounded z-10">
      <li v-for="option in options" :key="option" @click="selectOption(option)"
        :class="['p-3 hover:bg-[#eceff4] cursor-pointer select-none', { 'bg-[#e5e9f0]': option === modelValue }]">
        <div class="flex flex-row items-start justify-between">
          <div>
            {{ option }}
          </div>
          <div v-if="option === modelValue" class="flex justify-center items-center h-6 select-none">
            <img src="@/assets/images/checkmark.svg" alt="Checkmark">
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "Dropdown",
    props: {
      id: { type: String, required: true },
      label: { type: String, required: true },
      options: { type: Array, required: true },
      placeholder: { type: String, default: "Select an option" },
      modelValue: { type: [String, Number], default: "" },
      hasError: { type: Boolean, default: false },
    },
    data() {
      return {
        isOpen: false,
      };
    },
    computed: {
      selectedLabel() {
        return this.options.includes(this.modelValue) ? this.modelValue : "";
      },
    },
    methods: {
      handleToggle() {
        if (!this.hasError) {
          this.isOpen = !this.isOpen;
        }
      },
      selectOption(option) {
        this.$emit("update:modelValue", option);
        this.isOpen = false;
      },
      handleClickOutside(event) {
        if (this.$refs.dropdownContainer && !this.$refs.dropdownContainer.contains(event.target)) {
          this.isOpen = false;
        }
      },
    },
    mounted() {
      document.addEventListener("click", this.handleClickOutside);
    },
    beforeDestroy() {
      document.removeEventListener("click", this.handleClickOutside);
    },
  };
</script>

<style scoped>
  .dropdown-trigger {
    transition: all 0.3s ease;
  }

  .dropdown-list {
    animation: fadeIn 0.2s ease-out;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-5px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .rotate-180 {
    transform: rotate(180deg);
  }
</style>