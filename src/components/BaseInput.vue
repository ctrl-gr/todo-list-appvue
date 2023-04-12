<template>
<input type="text" :value="value" @input="updateValue" :class="{'border-red-500': error}"/>
  <div v-if="showError" class="error">{{ errorMessage }}</div>
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    value: String,
    error: Boolean,
    update: Function
  },
  data() {
    return {
      showError: this.error || false
    }
  },
  methods: {
    updateValue(event) {
      this.$emit("input", event.target.value);
      const showError = event.target.value.trim() === "";
      if (showError !== this.showError) {
        this.showError = showError;
      }
    }
  },
  computed: {
    errorMessage() {
      return "This field is required";
    }
  }
}
</script>

<style scoped>
input {
  @apply border border-blue-500 text-black rounded-md m-2 flex-wrap;
}

.error {
  @apply p-2 text-sm text-red-500;
}
</style>