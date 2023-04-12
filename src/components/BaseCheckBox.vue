<template>
<input type="checkbox" :checked="completed" @change="$emit('update:completed', $event.target.checked)" />
</template>

<script>
export default {
  name: "BaseCheckBox",
  props: {
    text: String,
    completed: Boolean
  }
}
</script>

<style scoped>

</style>