<template>
  <v-card
    class="control-button-card mx-2 my-2"
    :class="{ active: localState }"
    elevation="3"
  >
    <v-card-item class="d-flex justify-space-between align-center">
      <span class="control-label">{{ label }}</span>
      <v-switch
        v-model="localState"
        :color="color"
        inset
      ></v-switch>
    </v-card-item>
  </v-card>
</template>

<script>
export default {
  name: "ControlButton",
  props: {
    label: String,
    color: {
      type: String,
      default: "primary",
    },
    modelValue: Boolean,
  },
  emits: ["update:modelValue"],
  computed: {
    localState: {
      get() {
        return this.modelValue; // Bind to the parent component's value
      },
      set(value) {
        this.$emit("update:modelValue", value); // Emit the change to update the parent component
      },
    },
  },
};
</script>

<style scoped>
/* Default styles for the card with a gradient background */
.control-button-card {
  padding: 12px 20px;
  border-radius: 16px;
  background: linear-gradient(135deg, #d0f1ff, #fffdef, #ffe10076); /* Gradient: light blue, green, pink */
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  transition: background 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
}

/* Active state styles for the card */
.control-button-card.active {
  background: linear-gradient(135deg, #d0f1ff, #fffdef, #04a804c6); /* Soft green, yellow for active */
  box-shadow: 0px 8px 20px rgba(0, 150, 0, 0.2); /* Greenish-yellow shadow for active state */
}

/* Hover effect for the card */
.control-button-card:hover {
  transform: translateY(-4px);
}

/* Label styles with gradient text and shadow */
.control-label {
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  background: linear-gradient(90deg, #4caf50, #2196f3, #9c27b0); /* Gradient: green, blue, purple */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; /* Makes the gradient visible */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); /* Subtle text shadow for depth */
  font-family: "Roboto", sans-serif;
}

/* Custom styles for the switch */
.v-switch {
  --v-switch-track-color-on: #66bb6a; /* Active green for track */
  --v-switch-thumb-color-on: #388e3c; /* Active darker green for thumb */
  --v-switch-track-color-off: #cfd8dc; /* Light grey for track when off */
  --v-switch-thumb-color-off: #78909c; /* Dark grey for thumb when off */
}

.v-switch:hover .v-input__control {
  transform: scale(1.1); /* Slightly enlarge the switch on hover */
  transition: transform 0.2s ease;
}

/* Focus ring for accessibility */
.control-button-card:focus-within {
  box-shadow: 0px 0px 0px 3px rgba(102, 187, 106, 0.4); /* Green focus ring */
}
</style>
