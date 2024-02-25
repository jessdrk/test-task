<template>
  <button :class="color" class="btn">
    {{ buttonText }}
  </button>
</template>

<script>
export default {
  props: {
    buttonText: {
      type: String,
      default: '',
      required: true,
    },
    color: {
      type: String,
      default: 'btn-ghost',
      validator(value) {
        return ['btn-ghost', 'btn-primary'].includes(value);
      },
    },
  },
};
</script>
