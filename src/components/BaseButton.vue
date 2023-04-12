<template>
  <div>
    <button :disabled="disabled" :class="cssClass" @click="handleAction">
      <slot></slot>
    </button>
  </div>
</template>

<script>



export default {
  name: "BaseButton",
  props: {
    disabled: Boolean,
    cssClass: String
  },
  computed: {
    classes() {
      switch (this.cssClass) {
        case "solid":
          return "solid";
        case "outline":
          return "outline";
        case "text":
          return "text";
        default:
          return "";
      }
    }
  },
  methods: {
    handleAction() {
      this.$emit("button-clicked");
    }
  }
}
</script>
<style scoped>
button {
  @apply flex text-blue-500 p-1 flex-wrap;
}

button:disabled {
  @apply opacity-50 cursor-not-allowed;
}
.solid {
  @apply bg-blue-500 text-white rounded-md;
}

.text {
  @apply flex text-blue-500 p-1 flex-wrap;
}

.outline {
  @apply border border-blue-500 text-blue-500 rounded-md;
}


</style>